
import React, { useState } from 'react';
import { faCalculator, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Epi } from '../../dataTypes';
import './EpiItem.css';

type EpiItemProps = {
    epi: Epi,
    investigateEpi: (id: number) => void,
    reportScore: (id: number) => void,
}

const EpiItem: React.FC<EpiItemProps> = ({ epi, investigateEpi, reportScore }) => {

    const [isInvestigateActive, setIsInvestigateActive] = useState(true);
    const [isReportActive, setIsReportActive] = useState(true);

    const investigate = () => {
        investigateEpi(epi.id);
        setIsInvestigateActive(false);
    }

    const report = () => {
        reportScore(epi.id);
        setIsReportActive(false);
    }

    return (
        <div className='epiItem'>
            <div className='epiText'>{epi.text}</div>
            <div className='epiIcons'>
                <FontAwesomeIcon icon={faSearch} className={`icon investigate ${isInvestigateActive ? '' : 'nonActive'}`} onClick={investigate} />
                <FontAwesomeIcon icon={faCalculator} className={`icon aggregate ${isReportActive ? '' : 'nonActive'}`} onClick={report} />
            </div>
        </div>
    );
}

export default EpiItem;

