import React from 'react'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import ProtectedRouter from './Pages/ProtectedRouter/ProtectedRouter'
import ErrorPage from './error-page'
import { Route, Routes } from 'react-router'
import NotFound from './Pages/NotFound/NotFound'
import UserVerificationPortal from './Pages/user-verification-portal/User-Verification-Portal'

const App = () => {
    return (
        <Routes>
            <Route exact path="/" element={<ProtectedRouter Component={Login} />} errorElement={<ErrorPage />} />

            <Route exact path="/signup" element={<ProtectedRouter Component={SignUp} />} errorElement={<ErrorPage />} />
            <Route exact path="/login" element={<ProtectedRouter Component={Login} />} errorElement={<ErrorPage />} />

            {/*  user-verification-portal */}
            <Route exact path="*" element={<ProtectedRouter Component={NotFound} />} errorElement={<ErrorPage />} />
            <Route
                exact
                path="/user-verification-portal/"
                element={<ProtectedRouter Component={UserVerificationPortal} />}
                errorElement={<ErrorPage />}
            />

            {/* <PrivateRoute path="/private" element={<Private />} /> */}
        </Routes>
    )
}

export default App
