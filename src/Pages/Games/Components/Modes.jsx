import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { Form } from 'react-router-dom'

const Modes = ({ gameData, link, linkHandler }) => {
    const [showGameModesError, setShowGameModesError] = useState(false)

    const gameModesErrorClose = () => setShowGameModesError(false)
    const gameModesErrorShow = () => {
        setShowGameModesError(true)
    }
    return (
        <div className="second-half">
            <h6>
                <b>Game Modes</b>
            </h6>
            <Card style={{ width: '18rem', fontSize: '12px' }}>
                <Card.Body>
                    <div className="game-details">
                        <div className="data">
                            <span>Free Gameplay</span>
                            <span className="text-primary" onClick={gameModesErrorShow}>
                                Activate
                            </span>
                        </div>
                        <div className="data">
                            <span>Daily Tournament </span>
                            <span className="text-primary" onClick={gameModesErrorShow}>
                                Activate
                            </span>
                        </div>
                        <div className="data">
                            <span>Weekly Tournament</span>
                            <span className="text-primary" onClick={gameModesErrorShow}>
                                Activate
                            </span>
                        </div>
                        <div className="data">
                            <span>Monthly Tournament</span>
                            <span className="text-primary" onClick={gameModesErrorShow}>
                                Activate
                            </span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            {/* {gameData.priority === '' ? ( */}
            {/* <>
                    <Modal.Header>
                        <Modal.Title>Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontWeight: '300' }}>
                        <Form.Label htmlFor="inputPassword5">Modal For Game Play</Form.Label>

                        <Form.Control
                            type="text"
                            id="inputPassword5"
                            value={link}
                            onChange={linkHandler}
                            aria-describedby="passwordHelpBlock"
                        />
                    </Modal.Body>
                    <Modal.Footer className="w-100 d-flex  " style={{ justifyContent: 'left' }}>
                        <Button
                            style={{ padding: '5px 35px', backgroundColor: '#4aa74a', border: 'none' }}
                            onClick={gameModesErrorClose}
                        >
                            Save
                        </Button>
                        <Button
                            style={{ padding: '5px 35px', backgroundColor: '#cb5c5c', border: 'none' }}
                            onClick={gameModesErrorClose}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </> */}
            {/* ) : ( */}
            <Modal show={showGameModesError} centered onHide={gameModesErrorClose}>
                <Modal.Header>
                    <Modal.Title>Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontWeight: '300' }}>
                    First create game after you can Active or In-Active Modes
                </Modal.Body>
                <Modal.Footer className="btn-style">
                    <Button variant="secondary" onClick={gameModesErrorClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Modes
