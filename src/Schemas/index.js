import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .required('Passwork is required')
        .min(8, 'Password must be at least 8 characters')
        .max(12, 'Password must be less then 12 characters'),
})

export const SignUpSchema = yup.object().shape({
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
