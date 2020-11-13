import React from 'react';

import { Epi } from '../../dataTypes';
import EpiItem from '../EpiItem/EpiItem';
import './EpiList.css';

type EpiListProps = {
    epiList: Array<Epi>
}

const EpiList: React.FC<EpiListProps> = ({epiList}) => {
    return (
        <div className='epiList'>
            <div className='textHeader'>Everyday peace indicators</div>
            {epiList.map(epi => <EpiItem key={epi.id} epi={epi}/>)}
        </div>
    );

}

export default EpiList;

