import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './Content.css';
import EpiList from '../EpiList/EpiList';
import TrustPeople from '../TrustPeople/TrustPeople';
import { chainEpiList } from '../../common/apiFunctions';
import AddEpiModal from '../AddEpi/AddEpiModal';
import { mockEpiList } from '../../common/mockData';


const Content: React.FC = () => {
    const [isTrustPeopleVisibile, setIsTrustPeopleVisible] = useState(false);
    const [isAddEpiVisible, setisAddEpiVisible] = useState(false);
    const [epi, setEpi] = useState([]);
    const [isEpiLoading, setIsEpiLoading] = useState(true);
    const [trustPeople, setTrustPeople] = useState([])
    const [isTrustPeopleLoading, setIsTrustPeopleLoading] = useState(true);

    useEffect(() => {
        const fetchEpi = async () => {
            let list = await Promise.resolve(mockEpiList);
            setEpi(list);
            setIsEpiLoading(false);
        };

        const fetchTrustPeople = async () => {
            // const result = await Promise.resolve(mockedUpTrustPeople);
            // setTrustPeople(result);
            setIsTrustPeopleLoading(false);
        }

        const fetchData = async () => await Promise.all([fetchEpi(), fetchTrustPeople()])

        try {
            fetchData();
        } catch (error) {
            //handle error
        }
    }, []);

    const reportEpi = async (epiId: number) => {
        //await...
    }

    return (
        <div className='contentContainer'>
            <EpiList epiList={epi} isLoadingData={isEpiLoading} reportEpi={reportEpi} />
            <div className='icons'>
                {!isTrustPeopleVisibile && <FontAwesomeIcon icon={faUserCircle} onClick={() => setIsTrustPeopleVisible(true)} />}
                {!isAddEpiVisible && <FontAwesomeIcon icon={faPlusCircle} style={{ marginLeft: "10px" }} onClick={() => setisAddEpiVisible(true)} />}
            </div>
            {isTrustPeopleVisibile && <TrustPeople people={trustPeople} isLoadingData={isTrustPeopleLoading} closeTrustPeople={() => setIsTrustPeopleVisible(false)} />}
            {isAddEpiVisible && <AddEpiModal closeModal={() => setisAddEpiVisible(false)} />}
        </div>
    );
}

export default Content;

