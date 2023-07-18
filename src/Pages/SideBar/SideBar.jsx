import React from 'react'
import '../SideBar/SideBar.css'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const SideBar = () => {
    const role = localStorage.getItem('role')

    return (
        <div className="sidebar bg-black">
            <Navbar expand="lg" className="bg-body-tertiary px-4" style={{ minHeight: '45px' }}>
                <Navbar.Brand className="fs-6 p-0">Admin Panel</Navbar.Brand>
            </Navbar>
            {role === 'superadmin' ? (
                <Nav className="flex-column">
                    <LinkContainer to="/user-verification-portal">
                        <Nav.Link>Super Admin</Nav.Link>
                    </LinkContainer>
                </Nav>
            ) : (
                <Nav className="flex-column">
                    <LinkContainer to="/games">
                        <Nav.Link>Games</Nav.Link>
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
