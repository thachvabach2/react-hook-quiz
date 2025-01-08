import { useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from '../../services/apiService';
import _ from 'lodash'
import './DetailQuiz.scss'

const DetailQuiz = (props) => {
    const params = useParams()
    const location = useLocation()

    const quizId = params.id

    useEffect(() => {
        fetchQuestions()
    }, [quizId])

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId)
        console.log('>>>> check question: ', res)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let questionDescription, image = null
                    let answers = []
                    answers = value.map((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description
                            image = item.image
                        }
                        return item.answers
                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            console.log(data)
        }
    }

    return (
        <div className='detail-quiz-container'>
            <div className='left-content'>
                <div className='title'>
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className='q-body'>
                    <img />
                </div>
                <div className='q-content'>
                    <div className='question'>Questions 1: How are you doing?</div>
                    <div className='answer'>
                        <div className='a-child'>A. asdfsadf</div>
                        <div className='a-child'>B. asdfsadf</div>
                        <div className='a-child'>C. asdfsadf</div>
                    </div>
                </div>
                <div className='footer'>
                    <button className='btn btn-secondary'>Prev</button>
                    <button className='btn btn-primary'>Next</button>
                </div>
            </div>
            <div className='right-content'>
                count down
            </div>
        </div>
    )
}

export default DetailQuiz