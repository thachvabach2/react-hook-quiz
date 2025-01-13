import { useState, useEffect } from 'react';
import './DashBoard.scss'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverview } from '../../../services/apiService';
import { useTranslation } from 'react-i18next';

const DashBoard = (props) => {
    const { t } = useTranslation()

    const [dataOverview, setDataOverview] = useState([])
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        fetchDataOverView()
    }, [])

    const fetchDataOverView = async () => {
        let res = await getOverview()
        if (res && res.EC === 0) {
            setDataOverview(res.DT)

            //process chart
            let Qz = 0, Qs = 0, As = 0
            Qz = res?.DT?.others?.countQuiz ?? 0
            Qs = res?.DT?.others?.countQuestions ?? 0
            As = res?.DT?.others?.countAnswers ?? 0
            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz,
                },
                {
                    "name": "Questions",
                    "Qs": Qs,
                },
                {
                    "name": "Answers",
                    "As": As,
                }
            ]
            setDataChart(data)
        }
    }

    return (
        <div className='dashboard-container'>
            <div className='title'>
                {t('admin.dashboard.title')}
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'> {t('admin.dashboard.content.c-left.child.total-users')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.users && dataOverview.users.total
                                ?
                                <>{dataOverview.users.total}</>
                                :
                                0
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.dashboard.content.c-left.child.total-quizzes')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuiz
                                ?
                                <>{dataOverview.others.countQuiz}</>
                                :
                                0
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.dashboard.content.c-left.child.total-questions')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuestions
                                ?
                                <>{dataOverview.others.countQuestions}</>
                                :
                                0
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.dashboard.content.c-left.child.total-answers')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countAnswers
                                ?
                                <>{dataOverview.others.countAnswers}</>
                                :
                                0
                            }
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width={'95%'} height={'100%'}>
                        <BarChart data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#d78a2d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div >
    )
}

export default DashBoard