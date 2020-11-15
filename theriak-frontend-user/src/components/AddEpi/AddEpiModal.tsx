import React, { useState } from 'react';
import { faCheckCircle, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddEpiModal.css';
import { submitEpis } from '../../common/apiFunctions';

type AddEpiModalProps = {
    closeModal: () => void;
}

const AddEpiModal: React.FC<AddEpiModalProps> = ({ closeModal }) => {
    const [newEpi, setNewEpi] = React.useState("");
    const [epis, setEpis] = useState([]);

    const inputChanged = (e: any) => {
        console.log('dupa');
        setNewEpi(e.target.value);
    };

    const addNewEpi = (e: any) => {
        e.preventDefault();
        console.log('dupa123');
        if (newEpi === '') return;
        setEpis([...epis, newEpi]);
        setNewEpi('');
    }

    const sendNewEpis = async () => {
        submitEpis(epis);
        closeModal();
    }

    return (
        <div className='epiModal'>
            <div className='modalContent'>
                <FontAwesomeIcon className='modalCloseIcon' icon={faTimesCircle} onClick={() => closeModal()} />
                {epis.length > 0 && <div className='epiModalList'>{epis.map(epi => <p style={{ marginBottom: "7px" }}>&bull; {epi}</p>)}</div>}
                <div className='epiModalInput'>
                    <textarea placeholder="Add new EPI" id="newEpi" className='newEpiInput' onChange={inputChanged} value={newEpi}></textarea>
                    <FontAwesomeIcon className='addNewEpiBtn' icon={faPlusCircle} onClick={addNewEpi} />
                </div>
                <FontAwesomeIcon className='sendEpisBtn' icon={faCheckCircle} onClick={() => sendNewEpis()} />
            </div>
        </div>
    )
}

export default AddEpiModal;