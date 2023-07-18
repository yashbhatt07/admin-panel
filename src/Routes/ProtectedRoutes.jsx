import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRouter({ Component }) {
    const navigate = useNavigate()
    useEffect(() => {
        let login = localStorage.getItem('auth')
        if (!login) {
            return navigate('/login', { replace: true })
        }
    }, [])

    return <Component />
}

export default ProtectedRouter
