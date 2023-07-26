import { Fragment, useEffect } from 'react'
import Public from './public.routes.jsx'
import { useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout.jsx'

const App = () => {
    const navigate = useNavigate()

    const auth = localStorage.getItem('auth')

    useEffect(() => {
        if (!auth) {
            navigate('/login')

            loginRoute()
        }
    }, [auth])

    const loginRoute = () => {
        localStorage.clear()
        return <Public />
    }

    return <Fragment>{auth ? <Layout /> : loginRoute()}</Fragment>
}

export default App
