import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation } from 'react-i18next';
import { FaReact } from "react-icons/fa";
import Profile from './Profile';
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { t } = useTranslation();

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)

    const [showModalProfile, setShowModalProfile] = useState(false)

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignup = () => {
        navigate('/register')
    }

    const handleLogout = async () => {
        let rs = await logout(account.email, account.refresh_token)
        if (rs && rs.EC === 0) {
            // clear data redux
            dispatch(doLogout())
            navigate('/login')
        } else {
            toast.error(rs.EM)
        }
    }

    return (
        <>
            <Navbar expand="lg" bg="light">
                <Container>
                    {/* <Navbar.Brand href="/">IT Zui Zẻ</Navbar.Brand> */}
                    <FaReact className='brand-icon' />
                    <NavLink to="/" className='navbar-brand'>{t('header.brand')}</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link'>{t('header.home')}</NavLink>
                            <NavLink to="/users" className='nav-link'>{t('header.users')}</NavLink>
                            <NavLink to="/admins" className='nav-link'>{t('header.admin')}</NavLink>
                        </Nav>
                        <Nav>
                            {!isAuthenticated
                                ?
                                <>
                                    <button className='btn-login' onClick={() => handleLogin()}>{t('header.login')}</button>
                                    <button className='btn-signup' onClick={() => handleSignup()}>{t('header.signup')}</button>
                                </>
                                :
                                <NavDropdown title={t('header.setting')} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => setShowModalProfile(true)}>{t('header.profile')}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogout()}>{t('header.logout')}</NavDropdown.Item>
                                </NavDropdown>
                            }
                            <Language />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Profile
                show={showModalProfile}
                setShow={setShowModalProfile}
            />
        </>
    );
}

export default Header;