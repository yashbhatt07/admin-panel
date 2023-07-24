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

export const EditSchema = yup.object().shape({
    profile: yup.string(),

    name: yup
        .string()
        .required('Name is required')
        .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'Name can only contain Latin letters.')
        .min(2, 'Name must be at least 2 characters')
        .max(12, 'Name must be less then 12 characters')
        .required('Name is required'),
    genre: yup
        .object()
        .shape({
            label: yup.string().required('Status is Required'),
            value: yup.string().required('status is required'),
        })
        .nullable()
        .required('Please Select Genre'),

    developedBy: yup
        .object()
        .shape({
            label: yup.string().required('developedBy is Required'),
            value: yup.string().required('developedBy is Required'),
        })
        .nullable()
        .required('Please Select DevlopedBy'),

    isFeatured: yup.boolean(),
    priority: yup.number().required('Priority is required'),
    status: yup.string(),
})
