import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import './Content.css';
import { Epi, TrustPerson } from '../../dataTypes';
import EpiList from '../EpiList/EpiList';
import TrustPeople from '../TrustPeople/TrustPeople';

const mockedUpEpiList: Array<Epi> = [
    { id: 1, text: "Lorem ipsum dolor sit Maecenas feugiat tortor orci, eu lobortis " },
    { id: 2, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lCurabitur vitae venenatis mauris" },
    { id: 3, text: "Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
    { id: 4, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
    { id: 5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis facilisis massa fringilla accumsan. Curabitur vitae venenatis mauris, nec fermentum augue." },
    { id: 6, text: "Lorem ipsum dolor sit Maecenas feugiat tortor orci, eu lobortis " },
    { id: 7, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lCurabitur vitae venenatis mauris" },
    { id: 8, text: "Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
    { id: 9, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
    { id: 10, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis facilisis massa fringilla accumsan. Curabitur vitae venenatis mauris, nec fermentum augue." },
    { id: 11, text: "Lorem ipsum dolor sit Maecenas feugiat tortor orci, eu lobortis " },
    { id: 12, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lCurabitur vitae venenatis mauris" },
    { id: 13, text: "Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
    { id: 14, text: "Aenean convallis laoreet elit tempus pharetra. Maecenas feugiat tortor orci, eu lobortis arcu elementum vitae. Maecenas convallis, leo sed p" },
]

const mockedUpTrustPeople: Array<TrustPerson> = [
    { id: 1, name: "Charles Adams", trustRate: 100 },
    { id: 2, name: "Yolanda Lowery", trustRate: 80 },
    { id: 3, name: "Honor Mcclain", trustRate: 70 },
    { id: 4, name: "Vijay Mclaughlin", trustRate: 25 },
    { id: 5, name: "Romario Mackie", trustRate: 60 },
    { id: 6, name: "Martha Rahman", trustRate: 40 },
    { id: 7, name: "Jareth Browning", trustRate: 90 },
    { id: 8, name: "Charles Adams", trustRate: 100 },
    { id: 9, name: "Yolanda Lowery", trustRate: 80 },
    { id: 10, name: "Honor Mcclain", trustRate: 70 },
    { id: 11, name: "Vijay Mclaughlin", trustRate: 25 },
    { id: 12, name: "Romario Mackie", trustRate: 60 },
    { id: 13, name: "Martha Rahman", trustRate: 40 },
    { id: 14, name: "Jareth Browning", trustRate: 90 },
    { id: 15, name: "Charles Adams", trustRate: 100 },
    { id: 16, name: "Yolanda Lowery", trustRate: 80 },
    { id: 17, name: "Honor Mcclain", trustRate: 70 },
    { id: 18, name: "Vijay Mclaughlin", trustRate: 25 },
    { id: 19, name: "Romario Mackie", trustRate: 60 },
    { id: 20, name: "Martha Rahman", trustRate: 40 },
    { id: 21, name: "Jareth Browning", trustRate: 90 }
]

const Content: React.FC = () => {

    const [isTrustPeopleVisibile, setIsTrustPeopleVisible] = useState(false);
    const [epi, setEpi] = useState([]);
    const [isEpiLoading, setIsEpiLoading] = useState(true);
    const [trustPeople, setTrustPeople] = useState([])
    const [isTrustPeopleLoading, setIsTrustPeopleLoading] = useState(true);

    useEffect(() => {
        const fetchEpi = async () => {
            const result = await Promise.resolve(mockedUpEpiList);
            setEpi(result);
            setIsEpiLoading(false);
        };

        const fetchTrustPeople = async () => {
            const result = await Promise.resolve(mockedUpTrustPeople);
            setTrustPeople(result);
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
        //todo add endpoint api
        await Promise.resolve();
    }

    return (
        <div className='contentContainer'>
            <EpiList epiList={epi} isLoadingData={isEpiLoading} reportEpi={reportEpi} />
            {!isTrustPeopleVisibile && <FontAwesomeIcon icon={faUserCircle} className='peopleIcon' onClick={() => setIsTrustPeopleVisible(true)} />}
            {isTrustPeopleVisibile && <TrustPeople people={trustPeople} isLoadingData={isTrustPeopleLoading} closeTrustPeople={() => setIsTrustPeopleVisible(false)} />}
        </div>
    );

}

export default Content;

