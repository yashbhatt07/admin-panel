import React from 'react'
import '../SideBar/SideBar.css'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import profilelogo from '../../assets/newphoto.png'
import { useLocation } from 'react-router-dom'

const SideBar = () => {
    const role = localStorage.getItem('role')
    const location = useLocation()

    return (
        <div className="sidebar bg-black">
            <div
                style={{
                    height: '45px',
                    borderBottom: '1px solid rgba(255,255,255,0.3) ',
                    display: 'flex',
                    // justifyContent: 'center',
                }}
            >
                <Navbar.Brand className="fs-6 p-0  my-auto">
                    <img src={profilelogo} width={30} className="mx-2" />
                    Admin Panel
                </Navbar.Brand>
            </div>

            {role === 'superadmin' ? (
                <Nav className="flex-column">
                    <LinkContainer to="/user-verification-portal">
                        <Nav.Link>Super Admin</Nav.Link>
                    </LinkContainer>
                </Nav>
            ) : (
                <Nav className="flex-column mt-3">
                    <LinkContainer to="/games">
                        <Nav.Link className={location.pathname.startsWith('/games') ? 'selected' : ''}>Games</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/tournament">
                        <Nav.Link>Tournament</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/gamedevelopers">
                        <Nav.Link>Game Developers</Nav.Link>
                    </LinkContainer>
                </Nav>
            )}

            {/* <Link className="active">
                Yash Bhatt <hr />
            </Link>

            <Link
                onClick={() => {
                    navigate('/games')
                }}
            >
                Super Admin
            </Link> */}
        </div>
    )
}

export default SideBar
