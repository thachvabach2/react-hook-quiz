import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { deleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';
import { deleteQuizForAdmin } from '../../../../services/apiService';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props

    const handleClose = () => setShow(false);

    const handleSubmitDeleteQuiz = async () => {
        let res = await deleteQuizForAdmin(dataDelete.id)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose()
            await props.fetchQuiz()
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the Quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are your sure to delete this quiz. id =&nbsp;
                    <b>
                        {dataDelete && dataDelete.id ? dataDelete.id : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;