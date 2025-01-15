import { useEffect, useState } from 'react'
import { getHistory } from '../../services/apiService'
import { format } from 'date-fns';

const History = () => {
    const [listHistory, setListHistory] = useState()

    useEffect(() => {
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        let res = await getHistory()
        if (res && res.EC === 0) {
            let newData = res?.DT?.data?.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item?.quizHistory?.name ?? "",
                    id: item.id,
                    date: format(item.createdAt, 'dd/MM/yyy kk:mm:ss a')
                }
            })
            setListHistory(newData)
            console.log('history: ', res.DT.data)
        }

    }

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Quiz Name</th>
                        <th scope="col">Total Question</th>
                        <th scope="col">Total Correct</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 ?
                        listHistory.map((history, index) => {
                            return (<tr>
                                <td>{history.id}</td>
                                <td>{history.name}</td>
                                <td>{history.total_questions}</td>
                                <td>{history.total_correct}</td>
                                <td>{history.date}</td>
                            </tr>)
                        })
                        :
                        <tr>
                            <td>No data history</td>
                        </tr>
                    }

                </tbody>
            </table>
        </>
    )
}

export default History