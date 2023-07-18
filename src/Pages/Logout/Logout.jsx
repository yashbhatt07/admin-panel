import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear()
        return navigate('/login', {
            state: null,
            replace: true,
        })
    }, [])

    return null
}

export default Logout
