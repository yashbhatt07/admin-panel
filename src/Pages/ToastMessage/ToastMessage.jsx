import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ToastMessage() {
    return <ToastContainer style={{ marginTop: '45px' }} />
}

export const showToast = (message) => {
    toast.error(message, {
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
        theme: 'light',
    })
}

export const showSuccessMessage = (message) => {
    toast.success(message, {
        position: 'top-center',
        autoClose: 1000,
        // closeOnClick: true,
        theme: 'light',
    })
}

export default ToastMessage
