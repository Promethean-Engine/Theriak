import React from 'react';
import { Epi } from '../../dataTypes';
import './EpiItem.css';

type EpiItemProps = {
    epi: Epi,
    investigateEpi: (id: number) => void
}

const EpiItem: React.FC<EpiItemProps> = ({ epi, investigateEpi }) => {
    return (
        <div className='epiItem'>
            <div className='epiText'>{epi.text}</div>
            <div className='investigateBtn' onClick={() => investigateEpi(epi.id)}>Investigate</div>
        </div>
    );
}

export default EpiItem;

