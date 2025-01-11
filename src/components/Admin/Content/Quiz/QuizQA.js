import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss'
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import {
    getQuizWithQA, getAllQuizForAdmin,
    postUpsertQA
} from '../../../../services/apiService';
import { toast } from 'react-toastify';

const QuizQA = (props) => {
    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                    isValid: true
                }
            ]
        }
    ]

    const [questions, setQuestions] = useState(initQuestions)

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })

    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

    useEffect(() => {
        fetchQuiz()
    }, [])

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA()
        }
    }, [selectedQuiz])

    // return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }

    const fetchQuizWithQA = async () => {
        let rs = await getQuizWithQA(selectedQuiz.value)
        if (rs && rs.EC === 0) {
            // convert base64 to File object
            let newQA = []
            for (let i = 0; i < rs.DT.qa.length; i++) {
                let q = rs.DT.qa[i]
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png')
                }
                newQA.push(q)
            }
            setQuestions(newQA)
        }
    }

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0 && res.DT.length > 0) {
            let newQuiz = res.DT.map(quiz => {
                return ({
                    value: quiz.id,
                    label: `${quiz.id} - ${quiz.description}`
                })
            })
            setListQuiz(newQuiz)
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                        isValid: true
                    }
                ]
            }
            setQuestions([...questions, newQuestion])

        }

        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions)
            questionClone = questions.filter(question => question.id !== id)
            setQuestions(questionClone)
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
                isValid: true
            }

            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answers.push(newAnswer)
            setQuestions(questionClone)
        }

        if (type === 'REMOVE') {
            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionClone)
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionClone = _.cloneDeep(questions)
            let index = questionClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionClone[index].description = value
                setQuestions(questionClone)
            }
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0]
            questionClone[index].imageName = event.target.files[0].name
            setQuestions(questionClone)
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionClone[index].answers = questionClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX')
                        answer.isCorrect = value
                    if (type === 'INPUT') {
                        answer.description = value
                    }
                }
                return answer
            })
            setQuestions(questionClone)
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        //todo
        //validate selectedQuiz
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz!')
            return;
        }

        //validate answer
        let isValidAnswer = true
        let indexQ = 0, indexA = 0
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false
                    indexA = j
                    break
                }
            }
            indexQ = i
            if (isValidAnswer === false) {
                break
            }
        }

        if (isValidAnswer === false) {
            toast.error(`Not empty Answers ${indexA + 1} at Question ${indexQ + 1}`)
            let questionsClone0 = _.cloneDeep(questions)
            questionsClone0.map(question => {
                question.answers.map(answer => {
                    answer.isValid = true
                })
            })
            questionsClone0[indexQ].answers[indexA].isValid = false
            setQuestions(questionsClone0)
            return
        }

        //validate question
        let isValidQ = true
        let indexQ1 = 0
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false
                indexQ1 = i
                break
            }
        }
        if (isValidQ === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`)
            return
        }

        let questionsClone = _.cloneDeep(questions)
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile)
            }
        }

        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        })

        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchQuizWithQA()
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setDataImagePreview({
                title: questionClone[index].imageName,
                url: URL.createObjectURL(questionClone[index].imageFile)
            })
            setIsPreviewImage(true)
        }
    }

    return (
        <div className='questions-container'>
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add questions:
                </div>
                {
                    questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label>Question {index + 1} 's description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                            type={'file'} hidden />
                                        <span>
                                            {question.imageName ?
                                                <span
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handlePreviewImage(question.id)}
                                                >
                                                    {question.imageName}
                                                </span>
                                                :
                                                '0 file is uploaded'
                                            }
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <FaPlusCircle className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <FaMinusCircle className='icon-remove' />
                                            </span>
                                        }

                                    </div>
                                </div>
                                {question && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        value={answer.description}
                                                        type="text"
                                                        className={answer.isValid === false ? 'form-control is-invalid' : 'form-control'}
                                                        placeholder="name@example.com"
                                                        onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                    />
                                                    <label>Answers {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <FaRegPlusSquare className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <FaRegMinusSquare className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionForQuiz()}
                            className='btn btn-warning'
                        >
                            Save Question
                        </button>
                    </div>
                }

                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    >
                    </Lightbox>
                }
            </div>
        </div>
    )
}

export default QuizQA