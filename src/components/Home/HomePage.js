import { useNavigate } from 'react-router-dom'
import videoHomePage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux'
import { useTranslation, Trans } from 'react-i18next';

const HomePage = (props) => {
    const navigate = useNavigate()
    const { t } = useTranslation();

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    return (
        <div className='homepage-container'>
            <video autoPlay muted loop>
                <source
                    src={videoHomePage}
                    type="video/mp4"
                />
            </video>

            <div className='homepage-content'>
                <div className='title-1'>
                    {t('homepage.title1')}
                </div>
                <div className='title-2'>
                    {t('homepage.title2')}
                </div>
                <div className='title-3'>
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/login')}>{t('homepage.title3.login')}</button>
                        :
                        <button onClick={() => navigate('/users')}>{t('homepage.title3.users')}</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default HomePage