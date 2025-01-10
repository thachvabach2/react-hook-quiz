import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import _ from 'lodash';
import { putUpdateQuizForAdmin } from '../../../../services/apiService';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate } = props

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    const handleClose = () => {
        setShow(false)
        // setName('')
        // setDescription('')
        // setDifficulty('')
        // setImage('')
        // setPreviewImage('')
    }

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name)
            setDescription(dataUpdate.description)
            setDifficulty(dataUpdate.difficulty)
            setImage('')
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage('')
        }
    }

    const handleSubmitUpdateQuiz = async () => {
        let res = await putUpdateQuizForAdmin(dataUpdate.id, description, name, difficulty, image)
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
                size='xl'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update the quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select className="form-select"
                                onChange={(event) => setDifficulty(event.target.value)}
                                value={difficulty}
                            >
                                <option value={"EASY"}>EASY</option>
                                <option value={"MEDIUM"}>MEDIUM</option>
                                <option value={"HARD"}>HARD</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus /> Upload File Image
                            </label>
                            <input
                                type='file'
                                id='labelUpload' hidden
                                onChange={(event) => handleUploadImage(event)} />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz