import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserInfor from './UserInfor';
import './Share.scss'
import Password from './Password';
import History from './History';

const Profile = (props) => {
    const { show, setShow, account } = props

    const handleClose = () => {
        setShow(false)
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size='xl'
            backdrop='static'
            className='modal-profile'
        >
            <Modal.Header closeButton>
                <Modal.Title>Quản Lý Thông Tin Người Dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Main Infor">
                        <UserInfor />
                    </Tab>
                    <Tab eventKey="password" title="Password">
                        <Password />
                    </Tab>
                    <Tab eventKey="history" title="History">
                        <History />
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    )
}

export default Profile