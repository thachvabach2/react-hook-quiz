import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {
        fetchQuiz()
        fetchUser()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0 && res.DT.length > 0) {
            let newQuiz = res.DT.map(quiz => {
                return ({
                    value: quiz.id,
                    label: `${quiz.id} - ${quiz.name}`
                })
            })
            setListQuiz(newQuiz)
        }
    }

    const fetchUser = async () => {
        let res = await getAllUsers()
        console.log(res)
        if (res && res.EC === 0 && res.DT.length > 0) {
            let users = res.DT.map(user => {
                return ({
                    value: user.id,
                    label: `${user.id} - ${user.username} - ${user.email}`
                })
            })
            setListUser(users)
        }
    }

    const handleAssign = async () => {
        let rs = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (rs && rs.EC === 0) {
            toast.success(rs.EM)
            setSelectedQuiz({})
            setSelectedUser({})
        } else {
            toast.error(rs.EM)
        }
    }

    return (
        <div className='assign-quiz-container row'>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz:</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>

            <div className='col-6 form-group'>
                <label className='mb-2'>Select User:</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button
                    className='btn btn-warning mt-3'
                    onClick={() => handleAssign()}
                >
                    Assign
                </button>
            </div>
        </div>
    )
}

export default AssignQuiz