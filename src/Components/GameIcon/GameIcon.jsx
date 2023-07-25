import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
// import DummyProfile from '../../assets/DummyProfile.webp'
import profilelogo from '../../assets/profilelogo.png'

function GameIcon({ profile = '', setValue }) {
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    const isImageValid = (image) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
                const width = img.width
                const height = img.height
                if (width >= 1024 && height >= 102) {
                    resolve()
                } else {
                    reject()
                }
            }
            img.src = URL.createObjectURL(image)
        })
    }

    const onDrop = (acceptedFiles) => {
        const imageFile = acceptedFiles[0]

        isImageValid(imageFile)
            .then(() => {
                const reader = new FileReader()
                reader.onload = () => {
                    const base64String = reader.result
                    setValue('profile', base64String)
                    setFile({ file: imageFile, base64String })
                }
                reader.readAsDataURL(imageFile)
            })
            .catch(() => {
                setError('Image resolution must be 1024px x 102px or above.')
            })
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/jpeg,image/png',
        onDrop,
    })

    return (
        <>
            <section className="container">
                <div {...getRootProps({ className: 'dropZone' })}>
                    <input name="profile" {...getInputProps()} />
                    <div className="d-flex w-100 justify-content-between ">
                        {file ? (
                            <div className="container button">
                                <img width={50} height={50} src={file.base64String} alt="Uploaded" />
                                <br />
                                <button
                                    type="button"
                                    className="btn text-primary text-center"
                                    style={{ fontSize: '12px' }}
                                    id="btn"
                                >
                                    Edit
                                </button>{' '}
                            </div>
                        ) : (
                            <div className="container button">
                                {profile ? (
                                    <img width={50} height={50} src={profile} alt="Profile" />
                                ) : (
                                    <>
                                        <img
                                            width={70}
                                            height={80}
                                            src={profilelogo}
                                            alt="Profile"
                                            style={{ opacity: '30%' }}
                                        />
                                        <br />
                                        <span className="error">{error}</span>
                                    </>
                                )}

                                <br />
                                <button
                                    type="button"
                                    className="btn text-primary text-center"
                                    style={{ fontSize: '12px' }}
                                    id="btn"
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

GameIcon.propTypes = {
    setValue: PropTypes.func.isRequired,
    profile: PropTypes.string,
}

export default GameIcon
