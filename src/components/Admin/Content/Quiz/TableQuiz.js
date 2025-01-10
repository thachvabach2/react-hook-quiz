import { useEffect, useState } from 'react'
import { getAllQuizForAdmin } from '../../../../services/apiService'
import ModalUpdateQuiz from './ModalUpdateQuiz'
import ModalDeleteQuiz from './ModalDeleteQuiz'

const TableQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([])

    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    const [quizUpdate, setQuizUpdate] = useState({})
    const [quizDelete, setQuizDelete] = useState({})

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    const handleUpdateQuiz = (quiz) => {
        setShowModalUpdate(true)
        setQuizUpdate(quiz)
    }

    const handleDeleteQuiz = (quiz) => {
        setShowModalDelete(true)
        setQuizDelete(quiz)
    }

    return (
        <>
            <div>List Quizzes</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 ?
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <button
                                                className='btn btn-warning'
                                                onClick={() => handleUpdateQuiz(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteQuiz(item)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr>
                            <td colSpan={'100%'}>No data</td>
                        </tr>
                    }
                </tbody>
            </table>
            <ModalUpdateQuiz
                show={showModalUpdate}
                setShow={setShowModalUpdate}
                dataUpdate={quizUpdate}
                fetchQuiz={fetchQuiz}
            />

            <ModalDeleteQuiz
                show={showModalDelete}
                setShow={setShowModalDelete}
                dataDelete={quizDelete}
                fetchQuiz={fetchQuiz}
            />
        </>
    )
}

export default TableQuiz