import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { postUpdateProfile } from '../../services/apiService';
import { doUpdateProfile } from '../../redux/action/userAction';

const UserInfor = (props) => {
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        if (!_.isEmpty(account)) {
            //update state
            setEmail(account.email)
            setUsername(account.username)
            setRole(account.role)
            //bug here
            handleSetImage(account)
            if (account.image) {
                if (account.image.includes('data:image')) {
                    setPreviewImage(`${account.image}`)
                } else {
                    setPreviewImage(`data:image/jpeg;base64,${account.image}`)
                }
            }

        }
    }, [account])

    const handleSetImage = async (account) => {
        setImage(await urltoFile(`data:image/png;base64,${account.image}`, `hello.png`, 'image/png'))
    }

    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage('')
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handleUpdateProfile = async () => {
        //validate
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('invalid email')
            return;
        }

        let data = await postUpdateProfile(username, image)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            //update redux
            let imageBase64 = await toBase64(image)
            imageBase64 = imageBase64.split("base64,")[1]
            dispatch(doUpdateProfile(username, imageBase64))
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <form className="row g-3">
                <div className="col-md-4">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select className="form-select"
                        onChange={(event) => setRole(event.target.value)}
                        value={role}
                        disabled
                    >
                        <option value={"USER"}>USER</option>
                        <option value={"ADMIN"}>ADMIN</option>
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
            <Button className='mt-3' variant="warning" onClick={() => handleUpdateProfile()}>
                Update
            </Button>
        </>
    );
}

export default UserInfor