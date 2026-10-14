import React, { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

// asks "Are you sure?" before a balloon is deleted
const ConfirmDelete = ({ balloon, onConfirm, onCancel }) => {
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')

    const handleConfirm = async () => {
        setDeleting(true)
        setError('')
        try {
            await onConfirm(balloon)
        } catch (err) {
            setError(err.message)
            setDeleting(false)
        }
    }

    return (
        <Modal
            isOpen={Boolean(balloon)}
            onRequestClose={onCancel}
            className='modal'
            overlayClassName='modal-overlay'
            contentLabel='Delete balloon'
        >
            <div className='modal-icon' aria-hidden='true'>🎈</div>
            <h3>Are you sure?</h3>
            <p>
                <strong>{balloon?.name}</strong> will float away for good.
                You cannot undo this.
            </p>
            {error && <p className='form-error' role='alert'>{error}</p>}
            <div className='modal-actions'>
                <button type='button' className='btn btn-ghost' onClick={onCancel} disabled={deleting}>
                    Keep it
                </button>
                <button type='button' className='btn btn-danger' onClick={handleConfirm} disabled={deleting}>
                    {deleting ? 'Deleting...' : 'Yes, delete'}
                </button>
            </div>
        </Modal>
    )
}

export default ConfirmDelete
