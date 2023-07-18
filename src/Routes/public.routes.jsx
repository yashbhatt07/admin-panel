import { Route, Routes } from 'react-router-dom'

import ErrorPage from '../error-page'
import Login from '../Pages/Login/Login'
import SignUp from '../Pages/SignUp/SignUp'
import NotFound from '../Pages/NotFound/NotFound'
import Logout from '../Pages/Logout/Logout'

const Public = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
            <Route exact path="/signup" element={<SignUp />} errorElement={<ErrorPage />} />
            <Route exact path="/login" element={<Login />} errorElement={<ErrorPage />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} errorElement={<ErrorPage />} />
        </Routes>
    )
}

export default Public
