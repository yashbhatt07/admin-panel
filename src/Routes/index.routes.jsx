import { Fragment, useEffect } from 'react'
import Public from './public.routes.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout.jsx'

const App = () => {
    const location = useLocation()
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

    return (
        <Fragment>{location.pathname === '/login' || location.pathname === '/' ? loginRoute() : <Layout />}</Fragment>
    )
}

export default App
