import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

function GameBanners({ banners = '', setValue }) {
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
                    setValue('banners', base64String)
                    setFile({ file: imageFile, base64String })
                }
                reader.readAsDataURL(imageFile)
            })
            .catch(() => {
                setError('Image resolution must be 1024px x 102px or above.')
            })
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg,image/png',
        onDrop,
        multiple: true,
    })

    return (
        <>
            <section className="container">
                <div {...getRootProps({ className: 'dropZone' })}>
                    <input name="profile" {...getInputProps()} />
                    <div className="d-flex w-100 justify-content-between ">
                        {file ? (
                            <div className="container button">
                                <img width={170} height={130} src={file.base64String} alt="Uploaded" />
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
                                {banners ? (
                                    <img width={70} height={70} src={banners} alt="Profile" />
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="btn text-primary text-center"
                                            style={{ fontSize: '12px', border: 'none' }}
                                            id="btn"
                                        >
                                            ++ ADD NEW
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default GameBanners
