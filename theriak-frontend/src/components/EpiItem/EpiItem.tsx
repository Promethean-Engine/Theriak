import React from 'react';

import { Epi } from '../../dataTypes';
import './EpiItem.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type EpiItemProps = {
    epi: Epi
}

const EpiItem: React.FC<EpiItemProps> = ({ epi }) => {
    return (
        <div className='epiItem'>
            <div className='epiText'>{epi.text}</div>
            <div className="epiIcons">
                <FontAwesomeIcon icon={faCheckCircle} className='icon accept' />
                <FontAwesomeIcon icon={faTimesCircle} className='icon decline' />
            </div>
        </div>
    );

}

export default EpiItem;

