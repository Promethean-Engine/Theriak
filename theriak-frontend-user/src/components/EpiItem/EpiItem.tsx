import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Epi } from '../../dataTypes';
import './EpiItem.css';

type EpiItemProps = {
    epi: Epi,
    reportEpi: (epiId: number, isViolated: boolean) => void
}

const EpiItem: React.FC<EpiItemProps> = ({ epi, reportEpi }) => {
    return (
        <div className='epiItem'>
            <div className='epiText'>{epi.text}</div>
            <div className="epiIcons">
                <FontAwesomeIcon icon={faCheckCircle} className='icon accept' onClick={() => reportEpi(epi.id, true)} />
                <FontAwesomeIcon icon={faTimesCircle} className='icon decline' onClick={() => reportEpi(epi.id, false)} />
            </div>
        </div>
    );

}

export default EpiItem;

