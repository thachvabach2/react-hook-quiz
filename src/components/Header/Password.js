import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { postChangePassword, postUpdateProfile } from '../../services/apiService';


const Password = (props) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleChangePassword = async () => {
        if (newPassword === confirmPassword) {
            let res = await postChangePassword(currentPassword, newPassword)
            if (res && res.EC === 0) {
                toast.success(res.EM)
            } else {
                toast.error(res.EM)
            }
        } else {
            toast.error('Confirmed Password Incorrect')
        }

    }

    return (
        <>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
            </form>
            <Button className='mt-3' variant="warning" onClick={() => handleChangePassword()}>
                Update
            </Button>
        </>
    );
}

export default Password