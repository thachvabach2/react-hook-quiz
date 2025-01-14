import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Profile = (props) => {
    const { show, setShow } = props

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
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Main Infor">
                        your Information
                    </Tab>
                    <Tab eventKey="password" title="Password">
                        Change Password
                    </Tab>
                    <Tab eventKey="history" title="History">
                        Your History
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    )
}

export default Profile