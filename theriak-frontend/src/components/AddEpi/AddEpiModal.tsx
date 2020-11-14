import React from 'react';
import { faCheckCircle, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddEpiModal.css';

type AddEpiModalProps = {
    closeModal: () => void;
}

const AddEpiModal: React.FC<AddEpiModalProps> = ({ closeModal }) => {
    return (
        <div className='epiModal'>
            <div className='modalContent'>
                <FontAwesomeIcon className='closeIcon' icon={faTimesCircle} onClick={() => closeModal()} />
                <div>list</div>
                <div>input</div>
                <FontAwesomeIcon icon={faPlusCircle} onClick={() => { }} />
                <FontAwesomeIcon icon={faCheckCircle} onClick={() => { }} />
            </div>
        </div>
    )
}

export default AddEpiModal;