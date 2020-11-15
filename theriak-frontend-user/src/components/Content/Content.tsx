import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './Content.css';
import EpiList from '../EpiList/EpiList';
import TrustPeople from '../TrustPeople/TrustPeople';
import { attestAffirmative, attestNegative, chainEpiList } from '../../common/apiFunctions';
import AddTrustModal from '../AddTrust/AddTrustModal';
import constructGraph from './Graph';
import { mockEpiList } from '../../common/mockData';


const Content: React.FC = () => {
    const [isTrustPeopleVisibile, setIsTrustPeopleVisible] = useState(false);
    const [isAddEpiVisible, setisAddEpiVisible] = useState(false);
    const [isAddTrustVisible, setisAddTrustVisible] = useState(false);
    const [epi, setEpi] = useState([]);
    const [isEpiLoading, setIsEpiLoading] = useState(true);
    const [trustPeople, setTrustPeople] = useState([])
    const [isTrustPeopleLoading, setIsTrustPeopleLoading] = useState(true);

    useEffect(() => {
        const fetchEpi = async () => {
            let list = await chainEpiList();
            setEpi(list);
            setIsEpiLoading(false);
        };

        const fetchTrustPeople = async () => {
            let list = await constructGraph();
            setTrustPeople(list);
            setIsTrustPeopleLoading(false);
        }

        const fetchData = async () => await Promise.all([fetchEpi(), fetchTrustPeople()])

        try {
            fetchData();
        } catch (error) {
            //handle error
        }
    }, []);

    const reportEpi = async (epiId: number, isViolated: boolean) => {
        isViolated ? await attestAffirmative(epiId) : await attestNegative(epiId);
    }

    return (
        <div className='contentContainer'>
            <EpiList epiList={epi} isLoadingData={isEpiLoading} reportEpi={reportEpi} />
            <div className='icons'>
                {!isTrustPeopleVisibile && <FontAwesomeIcon icon={faUserCircle} onClick={() => setIsTrustPeopleVisible(true)} />}
                {!isAddTrustVisible && <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: "10px" }} onClick={() => setisAddTrustVisible(true)} />}
            </div>
            {isTrustPeopleVisibile && <TrustPeople people={trustPeople} isLoadingData={isTrustPeopleLoading} closeTrustPeople={() => setIsTrustPeopleVisible(false)} />}
            {isAddTrustVisible && <AddTrustModal closeModal={() => setisAddTrustVisible(false)} />}
        </div>
    );
}

export default Content;

