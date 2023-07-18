import { Route, Routes } from 'react-router-dom'
import ProtectedRouter from './ProtectedRoutes'
import NotFound from '../Pages/NotFound/NotFound'
import ErrorPage from '../error-page'
import UserVerificationPortal from '../Pages/user-verification-portal/User-Verification-Portal'
import Logout from '../Pages/Logout/Logout'
import Tournament from '../Pages/Tournament/Tournament'
import GameDevelopers from '../Pages/Game Developers/GameDevelopers'
import Games from '../Pages/Games/Games'

const Protected = () => {
    return (
        <Routes>
            <Route
                exact
                path="/user-verification-portal"
                element={<ProtectedRouter Component={UserVerificationPortal} />}
                errorElement={<ErrorPage />}
            />
            <Route exact path="/games" element={<ProtectedRouter Component={Games} />} errorElement={<ErrorPage />} />
            <Route
                exact
                path="/tournament"
                element={<ProtectedRouter Component={Tournament} />}
                errorElement={<ErrorPage />}
            />
            <Route
                exact
                path="/gamedevelopers"
                element={<ProtectedRouter Component={GameDevelopers} />}
                errorElement={<ErrorPage />}
            />
            <Route exact path="/logout" element={<Logout />} />
            <Route path="*" element={<ProtectedRouter Component={NotFound} />} errorElement={<ErrorPage />} />
        </Routes>
    )
}

export default Protected
