import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
// import DummyProfile from '../../assets/DummyProfile.webp'
import profilelogo from '../../assets/profilelogo.png'

function GameIcon({ profile = '', setValue }) {
    const [file, setFile] = useState(null)

    const onDrop = (acceptedFiles) => {
        const imageFile = acceptedFiles[0]
        const reader = new FileReader()

        reader.onload = () => {
            const base64String = reader.result
            setValue('profile', base64String)
            setFile({ file: imageFile, base64String })
        }

        reader.readAsDataURL(imageFile)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/jpeg,image/png',
        onDrop,
    })
    const imageDimensionsValid = file && file.file && file.file.width >= 1024 && file.file.height >= 1024

    return (
        <>
            <section className="container">
                <div {...getRootProps({ className: 'dropZone' })}>
                    <input name="profile" {...getInputProps()} />
                    <div className="d-flex w-100 justify-content-between ">
                        {file ? (
                            <div className="container button">
                                <img width={50} height={50} src={file.base64String} />
                                <br />
                                <button
                                    type="button"
                                    className="  btn text-primary text-center "
                                    style={{ fontSize: '12px' }}
                                    id="btn"
                                >
                                    Edit
                                </button>{' '}
                            </div>
                        ) : (
                            <div className="container button">
                                {profile && imageDimensionsValid ? (
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
                                    </>
                                )}
                                <br />
                                <button
                                    type="button"
                                    className="  btn text-primary text-center "
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
