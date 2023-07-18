import React, { useState } from 'react'
import { Button, Card, Form, Offcanvas } from 'react-bootstrap'
import DummyPhoto from '../../assets/DummyProfile.webp'
import '../Games/Games.css'

const Games = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <div className="d-flex justify-content-between ">
                <div className="text-primary " style={{ fontSize: '10px' }}>
                    &lt;Game Listing
                </div>
                <div>
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                        NOT CONNECTED TO GAME SERVER
                    </span>
                    <Button variant="success mx-4 " style={{ width: '120px' }}>
                        Activate
                    </Button>
                </div>
            </div>
            <div className="main ">
                <div style={{ width: '45%' }} className="first-half ">
                    <div style={{ fontSize: '12px', gap: '10px' }}>
                        <div className="data">
                            <h6>
                                <b>Game Details </b>
                            </h6>
                            <button
                                type="button"
                                className="  btn text-primary text-center "
                                onClick={handleShow}
                                id="btn"
                            >
                                Edit
                            </button>
                            <Offcanvas show={show} onHide={handleClose} placement="end">
                                <Offcanvas.Body>
                                    <div className="edit">
                                        <div className="edit-btn">
                                            <Button className="btn-danger">Close</Button>
                                            <Button className="btn-success">Save Changes</Button>
                                        </div>
                                        <div className="mt-5">
                                            <span style={{ fontSize: '10px' }}>
                                                <b>Game Icon</b>
                                            </span>
                                            <br />
                                            <span style={{ fontSize: '9px' }}> {DummyPhoto}</span>
                                            <br />
                                            <img src={DummyPhoto} alt="Profile" width={45} />
                                            <br />
                                            <button
                                                style={{ fontSize: '10px' }}
                                                type="button"
                                                className="  btn text-primary text-left"
                                                id="btn"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        <Form
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Form.Label style={{ fontSize: '12px' }} htmlFor="inputPassword5">
                                                Name
                                            </Form.Label>
                                            <Form.Control
                                                style={{
                                                    width: '125px',
                                                    height: '30px',
                                                }}
                                                type="text"
                                                id="inputPassword5"
                                                aria-describedby="passwordHelpBlock"
                                            />
                                            {/* <br />
                                            <div>
                                                <Form.Label style={{ fontSize: '12px' }} htmlFor="inputPassword5">
                                                    Genre
                                                </Form.Label>
                                                <Form.Select aria-label="Default select example">
                                                    <option value="1">Racing</option>
                                                </Form.Select>
                                            </div>
                                            <br />
                                            <div>
                                                <Form.Label style={{ fontSize: '12px' }} htmlFor="inputPassword5">
                                                    Developed By
                                                </Form.Label>
                                                <Form.Select aria-label="Default select example">
                                                    <option value="1">Indian Gaming Studio</option>
                                                </Form.Select>
                                            </div> */}
                                        </Form>
                                    </div>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </div>

                        <Card style={{ width: '20rem', height: '19rem' }}>
                            <Card.Body>
                                <div className=" game-details">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Card.Title style={{ fontSize: '15px', margin: 'auto 0' }}>
                                            <b>Game Icon</b>
                                        </Card.Title>
                                        <img src={DummyPhoto} alt="Profile" width={45} />
                                    </div>
                                    <div className="data">
                                        <span>ID</span>
                                        <span>-</span>
                                    </div>
                                    <div className="data">
                                        <span>Name</span>
                                        <span>-</span>
                                    </div>
                                    <div className="data">
                                        <span>Genre</span>
                                        <span>-</span>
                                    </div>
                                    <div className="data">
                                        <span>Developed By</span>
                                        <span>-</span>
                                    </div>
                                    <div className="data">
                                        <span>Featured By</span>
                                        <span>-</span>
                                    </div>
                                    <div className="data">
                                        <span>New Game Priority</span>
                                        <span>0</span>
                                    </div>
                                    <div className="data">
                                        <span>Status</span>
                                        <Button className="btn-warning btn-sm">Draft</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="second-half">
                        <h6>
                            <b>Game Modes</b>
                        </h6>
                        <Card style={{ width: '18rem', fontSize: '12px' }}>
                            <Card.Body>
                                <div className="game-details">
                                    <div className="data">
                                        <span>Free Gameplay</span>
                                        <span className="text-primary">Activate</span>
                                    </div>
                                    <div className="data">
                                        <span>Daily Tournament </span>
                                        <span className="text-primary">Activate</span>
                                    </div>
                                    <div className="data">
                                        <span>Weekly Tournament</span>
                                        <span className="text-primary">Activate</span>
                                    </div>
                                    <div className="data">
                                        <span>Monthly Tournament</span>
                                        <span className="text-primary">Activate</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="mt-4 mx-2">
                        <h6>
                            <b>Game Banners(0)</b>
                        </h6>
                        <button className="text-primary " style={{ fontSize: '12px', border: 'none' }}>
                            +ADD NEW
                        </button>
                    </div>
                </div>
                <div>
                    <h6>
                        <b>Game Stats </b>
                    </h6>
                    <div className="d-flex text-center" style={{ gap: '12px' }}>
                        <Card style={{ width: '9rem', height: '5rem' }}>
                            <Card.Body className="text-center">
                                <Card.Title>Game Icon</Card.Title>
                                <Card.Text>-</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '9rem', height: '5rem' }}>
                            <Card.Body>
                                <Card.Title>Game Icon</Card.Title>
                                <Card.Text>-</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '9rem', height: '5rem' }}>
                            <Card.Body>
                                <Card.Title>Game Icon</Card.Title>
                                <Card.Text>-</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="mt-4 mx-2">
                        <h6>
                            {' '}
                            <b>Gameplay Videos(0)</b>
                        </h6>
                        <button className="text-primary " style={{ fontSize: '12px', border: 'none' }}>
                            +ADD NEW
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Games
