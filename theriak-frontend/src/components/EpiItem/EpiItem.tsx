import React from 'react';
import { Epi } from '../../dataTypes';
import './EpiItem.css';

type EpiItemProps = {
    epi: Epi,
    reportEpi: (id: number) => void
}

const EpiItem: React.FC<EpiItemProps> = ({ epi, reportEpi }) => {
    return (
        <div className='epiItem'>
            <div className='epiText'>{epi.text}</div>
            <div className='investigateBtn' onClick={() => reportEpi(epi.id)}>Investigate</div>
        </div>
    );
}

export default EpiItem;

