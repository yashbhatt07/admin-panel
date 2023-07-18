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
                    style={{ width: 'calc(100% - 200px)', borderBottom: '1px solid #cacaca' }}
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
