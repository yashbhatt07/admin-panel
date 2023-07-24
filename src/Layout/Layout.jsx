import { Link } from 'react-router-dom'
import SideBar from '../Pages/SideBar/SideBar'
import Protected from '../Routes/protected.routes'

const Layout = () => {
    return (
        <div>
            <SideBar />
            <div className="layout">
                <div
                    className="head position-fixed"
                    style={{
                        width: 'calc(100% - 200px)',
                        borderBottom: '1px solid #cacaca',
                        zIndex: '1',
                        boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Link to="/logout" reloadDocument>
                        Logout
                    </Link>
                </div>
                <div className="container mt-4 pt-5">
                    <Protected />
                </div>
            </div>
        </div>
    )
}

export default Layout
