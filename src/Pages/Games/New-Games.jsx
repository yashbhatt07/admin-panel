import { useEffect, useState } from 'react'
import { Button, Card, Form, Modal, Offcanvas } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DummyPhoto from '../../assets/DummyProfile.webp'
import '../Games/New-Games.css'
import { Link, useParams } from 'react-router-dom'
import { EditSchema } from '../../Schemas'
import axios from 'axios'
import SelectItems from '../../Components/SelectItems/SelectItems'
import Details from './Components/Details'
import Modes from './Components/Modes'
import GameIcon from '../../Components/GameIcon/GameIcon'
import { showToast } from '../ToastMessage/ToastMessage'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

const NewGames = ({ type }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [gameData, setGameData] = useState({
        icon: '',
        name: '-',
        genre: {},
        developedBy: {},
        isFeatured: false,
        priority: null,
        gameLink: '',
        status: 'IN DRAFT',
        profile: '',
        stats: {
            userPlayed: 99656,
            gameplays: 545454,
            rewardsWon: 545454,
        },
        gameplayVideos: [],
        gameBanners: [],
        freeGameplay: [],
        dailyTournament: [],
        weeklyTournament: [],
        monthlyTournament: [],
    })
    const [show, setShow] = useState(false)
    const [showError, setShowError] = useState(false)
    const [showGamePlayError, setShowGamePlayError] = useState(false)
    const [showGameBannerError, setShowGameBannerError] = useState(false)
    const [showServerBox, setShowServerBox] = useState(false)
    const [serverStyle, setServerStyle] = useState({ color: 'red', fontSize: '12px' })
    const [link, setLink] = useState('')

    const linkHandler = (e) => {
        setLink(e.target.value)
    }
    console.log('🚀 ~ file: New-Games.jsx:51 ~ NewGames ~ link:', link)

    const serverConnectedHandler = () => {
        if (link !== '') {
            setServerStyle({ color: 'green', fontSize: '12px' })
            setLink('')
            errorHandleClose()
        }
    }

    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShow(true)
    }
    const errorHandleClose = () => {
        if (gameData.name === '-' || '') {
            setShowError(false)
        } else {
            setShowServerBox(false)
        }
    }
    const errorHandleShow = () => {
        if (gameData.name === '-' || '') {
            setShowError(true)
        } else {
            setShowServerBox(true)
        }
    }
    const GameplayErrorClose = () => setShowGamePlayError(false)
    const GameplayErrorShow = () => {
        setShowGamePlayError(true)
    }
    const GameBannersErrorClose = () => setShowGameBannerError(false)
    const GameBannersErrorShow = () => {
        setShowGameBannerError(true)
    }

    const defaultOptions = [
        { value: 'Racing', label: 'Racing' },
        { value: 'Farming', label: 'Farming' },
    ]
    const DevelopedBy = [
        { value: 'Wings Tech Solution', label: 'Wings Tech Solution' },
        { value: 'Indian Gaming Studio', label: 'Indian Gaming Studio' },
    ]

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(EditSchema),
    })

    useEffect(() => {
        const getGameById = async () => {
            return await axios
                .get(`games/${id}`)
                .then((res) => {
                    console.log('🚀 ~ file: New-Games.jsx:97 ~ .then ~ res:', res)
                    setGameData(res.data)
                    setValue('name', res.data.name)
                    setValue('genre', res.data.genre)
                    setValue('developedBy', res.data.developedBy)
                    setValue('isFeatured', res.data.isFeatured)
                    setValue('priority', res.data.priority)
                    setValue('profile', res.data?.profile || '')
                })
                .catch()
        }
        if (type === 'edit' && id) {
            getGameById()
        }
    }, [type, id, setValue])

    const submit = async (data) => {
        let dataToSend = _.cloneDeep(gameData)
        dataToSend = { ...dataToSend, ...data }
        console.log('🚀 ~ file: New-Games.jsx:112 ~ submit ~ dataToSend:', dataToSend)

        if (type === 'add') {
            await axios
                .post('games', dataToSend)

                .then((res) => {
                    setGameData(() => {
                        return { ...dataToSend }
                    })
                    navigate(`/games/edit/${res.data.id}`)
                    return res.data
                })
                .catch((err) => {
                    console.log(err)
                })
        } else if (type === 'edit') {
            await axios.put(`games/${id}`, dataToSend).then((res) => {
                const editedData = res.data
                setGameData((prev) => {
                    return { ...prev, ...editedData }
                })
            })
        } else {
            showToast()
        }

        handleClose()
    }

    const statusHandler = () => {
        if (type === 'edit') {
            setGameData((prevGameData) => {
                const newStatus =
                    prevGameData.status === 'IN DRAFT'
                        ? 'ACTIVE'
                        : prevGameData.status === 'ACTIVE'
                        ? 'INACTIVE'
                        : 'ACTIVE'

                const updatedGameData = {
                    ...prevGameData,
                    status: newStatus,
                }

                axios
                    .put(`games/${id}`, updatedGameData)
                    .then((res) => {})
                    .catch((error) => {
                        console.log('Error updating data:', error)
                    })

                return updatedGameData
            })
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between ">
                <div className="text-primary " style={{ fontSize: '10px' }}>
                    <Link to="/games"> &lt;Game Listing</Link>
                </div>
                <div>
                    <span style={serverStyle} onClick={errorHandleShow}>
                        NOT CONNECTED TO GAME SERVER
                    </span>
                    <Button
                        disabled={type !== 'edit'}
                        variant=" mx-4 "
                        style={{
                            width: '120px',
                            fontSize: '12px',
                            color: 'white',
                            padding: '7px 0',
                            backgroundColor: gameData.status === 'ACTIVE' ? '#4aa74a' : '#4aa74a',
                        }}
                        onClick={statusHandler}
                    >
                        {gameData.status === 'ACTIVE' ? 'DEACTIVATE' : 'ACTIVATE'}
                    </Button>
                </div>
            </div>
            <div className="container">
                <div className="d-flex flex-column">
                    <div className="d-flex">
                        <div style={{ width: '45%' }} className="first-half ">
                            <Details gameData={gameData} handleShow={handleShow} type={type} />
                            <Modes gameData={gameData} link={link} linkHandler={linkHandler} />
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
                                    <b>Gameplay Videos (0)</b>
                                </h6>
                                <button
                                    className="text-primary "
                                    style={{ fontSize: '12px', border: 'none' }}
                                    onClick={GameplayErrorShow}
                                >
                                    +ADD NEW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 mx-2">
                    <h6>
                        <b>Game Banners(0)</b>
                    </h6>
                    <button
                        className="text-primary "
                        style={{ fontSize: '12px', border: 'none' }}
                        onClick={GameBannersErrorShow}
                    >
                        +ADD NEW
                    </button>
                </div>
            </div>
            <Offcanvas show={show} onHide={handleClose} placement="end" style={{ backgroundColor: '#f3f1f1' }}>
                <Offcanvas.Body>
                    <div className="edit">
                        <Form onSubmit={handleSubmit(submit)}>
                            <div className="edit-btn">
                                <Button className="btn-danger" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button type="submit" className="btn-success">
                                    Save Changes
                                </Button>
                            </div>
                            <div className="mt-5 me-4">
                                <span style={{ fontSize: '12px' }}>Game Icon</span>
                                <br />
                                <span style={{ fontSize: '10px', color: 'gray' }}>
                                    png/jpg of 1024px x 102px or above
                                </span>
                                <br />
                                {/* <img src={DummyPhoto} alt="Profile" width={45} /> */}
                                <GameIcon profile={getValues('profile')} setValue={setValue} />
                                <br />
                            </div>
                            <div className="data">
                                <Form.Label style={{ fontSize: '12px' }} htmlFor="inputPassword5" className="my-auto">
                                    Name
                                </Form.Label>
                                <Form.Control
                                    style={{
                                        width: '205px',
                                        height: '35px',
                                        borderRadius: '3%',
                                    }}
                                    type="text"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    {...register('name')}
                                />
                            </div>
                            <span className="error">{errors.name?.message}</span>
                            <br />
                            <div className="data">
                                <Form.Label style={{ fontSize: '12px' }} htmlFor="inputPassword5" className="my-auto">
                                    Genre
                                </Form.Label>
                                <SelectItems
                                    style={{
                                        // width: '205px',
                                        // height: '35px',

                                        borderRadius: '3%',
                                    }}
                                    control={control}
                                    options={defaultOptions}
                                    name="genre"
                                    className="px-5"
                                />
                            </div>
                            <span className="error">{errors.genre?.value.message}</span> <br />
                            <div className="data">
                                <Form.Label style={{ fontSize: '12px' }} htmlFor="inputPassword5" className="my-auto">
                                    Developed By
                                </Form.Label>

                                <SelectItems
                                    style={{
                                        width: '205px',
                                        height: '35px',
                                        borderRadius: '3%',
                                    }}
                                    control={control}
                                    options={DevelopedBy}
                                    name="developedBy"
                                />
                            </div>
                            <span className="error">{errors.developedBy?.value.message}</span>{' '}
                            <div className="data mt-4">
                                <Form.Label style={{ fontSize: '12px' }} htmlFor="inputPassword5" className="my-auto">
                                    Featured Game
                                </Form.Label>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input "
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckDefault"
                                        style={{ width: '40px', height: '23px' }}
                                        {...register('isFeatured')}
                                        defaultChecked={gameData.isFeatured === 'Yes'}
                                    />
                                </div>
                            </div>
                            <span className="error">{errors.isFeatured?.message}</span>{' '}
                            <div className="data mt-4">
                                <Form.Label style={{ fontSize: '12px' }} htmlFor="inputPassword5" className="my-auto">
                                    New Game Priority
                                </Form.Label>
                                <Form.Control
                                    style={{
                                        width: '42px',
                                        height: '26px',
                                        borderRadius: '10%',
                                        fontSize: '9px',
                                    }}
                                    type="text"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    {...register('priority')}
                                />
                            </div>
                            <span className="error">{errors.priority?.message}</span>{' '}
                        </Form>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            <Modal show={showError} centered onHide={errorHandleClose}>
                <Modal.Header>
                    <Modal.Title>Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontWeight: '300' }}>First create game after you add game link!</Modal.Body>
                <Modal.Footer className="btn-style">
                    <Button variant="secondary" onClick={errorHandleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showServerBox} centered onHide={errorHandleClose}>
                <Modal.Header>
                    <Modal.Title>Link to Game Html File</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontWeight: '300' }}>
                    <Form.Label htmlFor="inputPassword5">Paste the URL of the game&apos;s index.html file.</Form.Label>

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
                        onClick={serverConnectedHandler}
                    >
                        Save
                    </Button>
                    <Button
                        style={{ padding: '5px 35px', backgroundColor: '#cb5c5c', border: 'none' }}
                        onClick={errorHandleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showGamePlayError} centered onHide={GameplayErrorClose}>
                {gameData.name !== '-' ? (
                    <>
                        <>
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
                                    onClick={GameplayErrorClose}
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{ padding: '5px 35px', backgroundColor: '#cb5c5c', border: 'none' }}
                                    onClick={GameplayErrorClose}
                                >
                                    Close
                                </Button>
                            </Modal.Footer>
                        </>
                    </>
                ) : (
                    <>
                        <Modal.Header>
                            <Modal.Title>Error!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontWeight: '300' }}>
                            First create game after you add Gameplay Videos!
                        </Modal.Body>
                        <Modal.Footer className="btn-style">
                            <Button variant="secondary" onClick={GameplayErrorClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>

            <Modal show={showGameBannerError} centered onHide={GameBannersErrorClose}>
                {gameData.name !== '-' ? (
                    <>
                        <Modal.Header>
                            <Modal.Title>Modal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontWeight: '300' }}>
                            <Form.Label htmlFor="inputPassword5">Modal For Game Banners</Form.Label>

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
                                onClick={GameBannersErrorClose}
                            >
                                Save
                            </Button>
                            <Button
                                style={{ padding: '5px 35px', backgroundColor: '#cb5c5c', border: 'none' }}
                                onClick={GameBannersErrorClose}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </>
                ) : (
                    <>
                        <Modal.Header>
                            <Modal.Title>Error!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontWeight: '300' }}>
                            First create game after you add Game Banners!
                        </Modal.Body>
                        <Modal.Footer className="btn-style ">
                            <Button variant="secondary" onClick={GameBannersErrorClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </>
    )
}

export default NewGames
