import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';

import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";

import './SideBar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SideBar = (props) => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { image, collapsed, toggled, handleToggleSidebar } = props
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={'3rem'} color={"00bfff"} />
                        <span onClick={() => navigate('/')}>{t('admin.sidebar.brand')}</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdDashboard />}>
                            {t('admin.sidebar.dashboard')}
                            <Link to='/admins'></Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title={t('admin.sidebar.title')}
                        >
                            <MenuItem>
                                {t('admin.sidebar.manage-user')}
                                <Link to='/admins/manage-users'></Link>
                            </MenuItem>
                            <MenuItem>
                                {t('admin.sidebar.manage-quiz')}
                                <Link to='/admins/manage-quizzes'></Link>
                            </MenuItem>
                            <MenuItem>
                                {t('admin.sidebar.manage-question')}
                                <Link to='/admins/manage-questions'></Link>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                &#169; viewSource
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar