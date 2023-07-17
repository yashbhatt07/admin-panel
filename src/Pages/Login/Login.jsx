import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router'
import Logo from '../../assets/logo.png'
// import ToastMessage from '../ToastMessage/ToastMessage'
// import SuccessMessage from '../ToastMessage/SuccessMessage'

import { LoginSchema } from '../../Schemas'
import { login } from '../../API/Users'

import './Login.css'
import _ from 'lodash'

const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginSchema),
    })

    const goToSignUpForm = () => {
        navigate('/signup')
    }

    useEffect(() => {
        localStorage.removeItem('login')
    }, [])

    const submit = async (data, event) => {
        event.preventDefault()
        LoginSchema.validate(data)

        const onLogin = await login(data)

        if (onLogin && !_.isEmpty(onLogin)) {
            if (onLogin.role === 'superadmin') {
                localStorage.setItem('login', true)

                return navigate('/user-verification-portal')
            }
        } else {
            setError('Wrong Credential')
        }
    }

    return (
        <>
            <div style={{ background: '#111', height: '100vh' }} className="main-l">
                <img src={Logo} alt="logo" width={150} height={150} />
                <Form style={{ margin: 'auto 0', marginLeft: '400px' }} onSubmit={handleSubmit(submit)}>
                    <h3 className="text-white mb-4 "> Admin Panel</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-white">Email address</Form.Label>
                        <Form.Control
                            type="email"
                            {...register('email')}
                            placeholder="Enter email..."
                            className="p-2"
                        />
                        <Form.Text className="text-muted"></Form.Text>
                        <span className="text-danger">{errors.email?.message}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="text-white">Password</Form.Label>
                        <Form.Control
                            type="password"
                            {...register('password')}
                            placeholder="Enter Password..."
                            className="p-2"
                        />
                        <span className="text-danger ">{errors.password?.message}</span>
                    </Form.Group>
                    <br />

                    <Button variant="primary  btn-lg me-2 mb-2" type="submit">
                        Login
                    </Button>

                    <span className="text-white">
                        Not a member?{' '}
                        <span onClick={goToSignUpForm} className="text-success">
                            SignUp
                        </span>
                    </span>
                    <br />
                    <span className="text-danger py-1 bg-white ">{error}</span>
                </Form>
            </div>
        </>
    )
}

export default Login
