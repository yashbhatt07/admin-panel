import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ErrorModal = ({ show, onHide, title, children }) => {
    return (
        <Modal show={show} centered onHide={onHide}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer className="btn-style">
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

ErrorModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.any,
    closeModal: PropTypes.func,
}

export default ErrorModal
