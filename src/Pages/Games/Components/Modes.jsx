import React from 'react'
import { Card } from 'react-bootstrap'

const Modes = () => {
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
    )
}

export default Modes
