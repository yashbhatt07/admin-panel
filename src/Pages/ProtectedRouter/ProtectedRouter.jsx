import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRouter({ Component }) {
    const navigate = useNavigate()
    useEffect(() => {
        let login = localStorage.getItem('login')
        if (!login) {
            navigate('/login')
        }
    }, [])

    return <Component />
}

export default ProtectedRouter
