import React, { useState } from 'react'
import '../SignUp/SignUp.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Button, Col, Row } from 'react-bootstrap'
import Logo from '../../assets/logo.png'
import { useNavigate } from 'react-router'
import _ from 'lodash'
import { addUser } from '../../API/Users'
import ToastMessage from '../ToastMessage/ToastMessage'
// import { showSuccessMessage } from '../ToastMessage/SuccessMessage'



function SignUp() {
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const schema = yup.object().shape({
        firstName: yup
            .string()
            .required('First Name Is Required')
            .min(4, 'First Name must be at least 4 characters')
            .max(8, 'First Name must be less then 8 characters'),
        lastName: yup
            .string()
            .required('lastName Is Required')
            .min(4, 'lastName must be at least 4 characters')
            .max(8, 'lastName must be less then 8 characters'),
        email: yup.string().email('This is not valid email type').required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(12, 'Password must be less then 12 characters'),
        confirmPassword: yup
            .string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(12, 'Password must be less then 12 characters'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    })

    const submit = async (data, event) => {
        event.preventDefault()
        // showSuccessMessage();
        console.log("🚀 ~ file: SignUp.jsx:56 ~ submit ~ showSuccessMessage:", showSuccessMessage)

        const updatedData = _.cloneDeep(data)
        updatedData.isVerified = false
        updatedData.isDeleted = false
        updatedData.createdAt = new Date()
        updatedData.updatedAt = null
        updatedData.role = 'user'
        

        const newUser = await addUser(updatedData)
        if (newUser && data.password === data.confirmPassword) {
            // toaster User registered successfully please verify it
            navigate('/login')
        } else if (data.confirmPassword !== data.password) {
            setError('Please Check Confirm Password')
        } else {
            setError('')
        }
    }

    const goToLogInForm = () => {
        navigate('/login')
    }

    return (
        <>
        <ToastMessage/>
        <div style={{ background: '#111', height: '100vh' }} className="main">
            <img src={Logo} alt="logo" width={150} height={150} />

            <Form style={{ margin: 'auto 0', marginLeft: '400px' }} onSubmit={handleSubmit(submit)}>
                <h3 className="text-white mb-4">SignUp</h3>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-white">First Name</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('firstName')}
                                placeholder="Enter First Name..."
                                className="p-2"
                            />
                            <Form.Text className="text-muted"></Form.Text>
                            <span className="text-danger gap-0">{errors.firstName?.message}</span>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-white">Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('lastName')}
                                placeholder="Enter Last Name..."
                                className="p-2"
                            />
                            <Form.Text className="text-muted"></Form.Text>
                            <span className="text-danger">{errors.lastName?.message}</span>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-white">Email address</Form.Label>
                    <Form.Control type="email" {...register('email')} placeholder="Enter email..." className="p-2" />
                    <Form.Text className="text-muted"></Form.Text>
                    <span className="text-danger">{errors.email?.message}</span>
                </Form.Group>
                <Row className="mb-3">
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="text-white">Password</Form.Label>
                            <Form.Control
                                type="password"
                                {...register('password')}
                                placeholder="Enter Password..."
                                className="p-2"
                            />
                            <span className="text-danger">{errors.password?.message}</span>
                        </Form.Group>
                    </Col>

                    <br />
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="text-white">Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                {...register('confirmPassword')}
                                placeholder="Enter Confirm Password..."
                                className="p-2"
                            />
                            <span className="text-danger">{errors.password?.message}</span>
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <Button variant="primary  btn-lg me-2 mb-3" type="submit">
                    SignUp
                </Button>
                <span className="text-white">
                    Are you a member?{' '}
                    <span onClick={goToLogInForm} className="text-success ">
                        LogIn
                    </span>
                </span>
                <br />
                <span className="text-danger bg-white py-2 ">{error}</span>
            </Form>
        </div>
        </>
    )
}

export default SignUp
