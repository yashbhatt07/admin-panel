import { Button, Card } from 'react-bootstrap'

import DummyPhoto from '../../../assets/DummyProfile.webp'
import profilelogo from '../../../assets/profilelogo.png'
const Details = ({ gameData, handleShow = () => {} }, type) => {
    console.log('🚀 ~ file: Details.jsx:6 ~ Details ~ gameData:', gameData)
    return (
        <div style={{ fontSize: '12px', gap: '10px' }}>
            <div className="data">
                <h6>
                    <b>Game Details </b>
                </h6>
                <button type="button" className="  btn text-primary text-center " onClick={handleShow} id="btn">
                    Edit
                </button>
            </div>

            <Card style={{ width: '20rem', height: '21rem' }}>
                <Card.Body>
                    <div className="game-details">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Card.Title style={{ fontSize: '15px', margin: 'auto 0' }}>
                                <b>Game Icon</b>
                            </Card.Title>
                            {gameData.profile ? (
                                <img src={gameData.profile} width={45} />
                            ) : (
                                <img
                                    src={profilelogo}
                                    alt="Profile"
                                    width={60}
                                    height={70}
                                    style={{ opacity: '13%' }}
                                />
                            )}
                        </div>
                        <div className="data">
                            <span>ID</span>
                            <span>{gameData.id || '-'}</span>
                        </div>

                        <div className="data">
                            <span>Name</span>
                            <span>{gameData.name || '-'} </span>
                        </div>
                        <div className="data">
                            <span>Genre</span>
                            <span>{gameData.genre.value || '-'}</span>
                        </div>
                        <div className="data">
                            <span>Developed By</span>
                            <span>{gameData.developedBy?.value || '-'}</span>
                        </div>
                        <div className="data">
                            <span>Featured By</span>
                            <span style={{ color: gameData.isFeatured ? 'green' : 'red' }}>
                                {gameData.isFeatured === true ? 'Yes' : 'No'}
                            </span>
                        </div>
                        <div className="data">
                            <span>New Game Priority</span>
                            <span>{gameData.priority || 0} </span>
                        </div>
                        <div className="data">
                            <span>Status</span>
                            <span
                                style={{
                                    color: 'white',
                                    fontSize: '11px',
                                    backgroundColor:
                                        gameData.status === 'IN DRAFT'
                                            ? '#d9b169fa'
                                            : gameData.status === 'ACTIVE'
                                            ? '#4aa74a'
                                            : '#cb5c5c',
                                }}
                                className="px-3 py-0"
                            >
                                {gameData.status === 'IN DRAFT'
                                    ? 'DRAFT'
                                    : gameData.status === 'ACTIVE'
                                    ? 'ACTIVE'
                                    : 'INACTIVE'}
                            </span>
                        </div>
                    </div>
                    {/* <p>Loading...</p> */}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Details
