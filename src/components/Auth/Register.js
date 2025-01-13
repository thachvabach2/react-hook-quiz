import { useState } from 'react'
import './Register.scss'
import axios from 'axios'
import { postRegister } from '../../services/apiService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Language from '../Header/Language'

const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleRegister = async () => {
        let data = await postRegister(email, password, username)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='header d-flex justify-content-end mt-2 gap-3 pe-5'>
                    <span className='my-auto'>Already have an account?</span>
                    <button
                        className='px-3 py-1 rounded'
                        onClick={() => navigate('/login')}
                    >
                        Log in
                    </button>
                    <div className='my-auto pe-5'>
                        <Language />
                    </div>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-4">
                    <div className='form-container'>
                        <div className='row'>
                            <div className='header text-center col-12 mb-3'>
                                <span className='fs-2'>ITZuiZe</span>
                            </div>
                            <div className='slogan text-center col-12 my-3'>
                                <span className='fs-5'>Start your journey?</span>
                            </div>
                            <div className='content-form col-12'>
                                <div className='form-group mb-4'>
                                    <label className='form-label'>Email (*)</label>
                                    <input
                                        type={'email '}
                                        className='form-control'
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-4'>
                                    <label className='form-label'>Password (*)</label>
                                    <div className='position-relative'>
                                        <input
                                            type={!isShowPassword ? 'password' : ''}
                                            className='form-control w-100'
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                        <span
                                            className='position-absolute top-50 end-0 translate-middle-y me-2'
                                            // cursor: pointer
                                            role="button"
                                            onClick={() => setIsShowPassword(!isShowPassword)}
                                        >
                                            {isShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}

                                        </span>
                                    </div>


                                </div>
                                <div className='form-group mb-3'>
                                    <label className='form-label'>Username</label>
                                    <input
                                        type={'text'}
                                        className='form-control'
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                    />
                                </div>
                                <button
                                    className='btn btn-dark w-100 p-2 my-4'
                                    onClick={() => handleRegister()}
                                >
                                    Create my free account
                                </button>
                            </div>
                            <span
                                className='text-center'
                                role="button"
                                onClick={() => navigate('/')}
                            >&#60;&#60; Go to Homepage
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register