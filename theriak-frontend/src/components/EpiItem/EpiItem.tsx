import React from 'react';
import { Epi } from '../../dataTypes';
import './EpiItem.css';

type EpiItemProps = {
    epi: Epi,
    reportEpi: (id: number) => void,
    reportScore: (id: number) => void,
}

const EpiItem: React.FC<EpiItemProps> = ({ epi, reportEpi, reportScore }) => {
    return (
        <div className='epiItem'>
            <div className='epiText'>{epi.text}</div>
            <div>
                <div className='investigateBtn' onClick={() => reportEpi(epi.id)}>Investigate</div>
                <div className='aggregateBtn' onClick={() => reportScore(epi.id)}>Aggregate</div>
            </div>
        </div>
    );
}

export default EpiItem;

