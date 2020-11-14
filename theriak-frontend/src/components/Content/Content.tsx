import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import hex2ascii from 'hex2ascii';
import {
    web3Accounts,
    web3Enable,
    web3FromAddress,
    web3ListRpcProviders,
    web3UseRpcProvider,
    web3FromSource
} from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import './Content.css';
import { Epi, TrustPerson } from '../../dataTypes';
import EpiList from '../EpiList/EpiList';
import TrustPeople from '../TrustPeople/TrustPeople';


async function sendTransaction() {
    // console.log(web3ListRpcProviders);
    // console.log(web3UseRpcProvider);
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    const allInjected = await web3Enable('Theriak Frontend');

    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    const allAccounts = await web3Accounts();

    const account = allAccounts[0];
    // console.log(api.tx.trust);
    // here we use the api to create a balance transfer to some account of a value of 12344
    const transferExtrinsic = api.tx.trust.issueTrust('5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ');

    // to be able to retrieve the signer interface from this account
    // we can use web3FromSource which will return an InjectedExtension type
    const injector = await web3FromSource(account.meta.source);

    // passing the injected account address as the first argument of signAndSend
    // will allow the api to retrieve the signer and the user will see the extension
    // popup asking to sign the balance transfer transaction
    
    transferExtrinsic.signAndSend(account.address, { signer: injector.signer }, ({ status }) => {
        if (status.isInBlock) {
            console.log(`Completed at block hash #${status.asInBlock.toString()}`);
        } else {
            console.log(`Current status: ${status.type}`);
        }
    }).catch((error: any) => {
        console.log(':( transaction failed', error);
    });
}

async function attestAffirmative(id: number) {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    const allInjected = await web3Enable('Theriak Frontend');
    const allAccounts = await web3Accounts();
    let account = allAccounts[0]
    const injector = await web3FromSource(account.meta.source);

    const attestExtrinsic = api.tx.peaceIndicators
        .attestAffirmative(id)
        .signAndSend(account.address, { signer: injector.signer }, (result) => {
            console.log(`Current status is ${result.status}`);

            if (result.status.isInBlock) {
                alert(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
                alert(`Transaction is finalized at blockHash ${result.status.asFinalized}`)
            }
        });
}

async function attestNegative(id: number) {
    // TODO:  could make this a global variable or pass it through props or something
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    const allInjected = await web3Enable('Theriak Frontend');
    const allAccounts = await web3Accounts();
    let account = allAccounts[0]
    const injector = await web3FromSource(account.meta.source);
   
   
    // currently we just get the first account
    // need to figure out how to get polkadot.js extension to choose accounts
    // but this is fine i guess
   
    const attestExtrinsic = api.tx.peaceIndicators
        .attestNegative(id)
        .signAndSend(account.address, {signer: injector.signer }, (result) => {
            console.log(`Current status is ${result.status}`);

            if (result.status.isInBlock) {
                alert(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
                alert(`Transaction is finalized at blockHash ${result.status.asFinalized}`)
            }
        });
}

const ChainEpiList = async (): Promise<Array<Epi>> => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });

    const epiSize = await api.query.peaceIndicators.indicatorSize();
    let epis: Array<Epi> = new Array();
    for (let i = 0; i < parseInt(epiSize.toString()); i++) {
        let epi = await api.query.peaceIndicators.peaceIndicators(i);
        let text = hex2ascii(epi.toString());
        epis[i] = { id: i, text: text };
    }

    return epis;
}
/*
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
*/

const Content: React.FC = () => {

    const [isTrustPeopleVisibile, setIsTrustPeopleVisible] = useState(false);
    const [epi, setEpi] = useState([]);
    const [isEpiLoading, setIsEpiLoading] = useState(true);
    const [trustPeople, setTrustPeople] = useState([])
    const [isTrustPeopleLoading, setIsTrustPeopleLoading] = useState(true);

    useEffect(() => {
        const fetchEpi = async () => {
            let list = await ChainEpiList();
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

    const reportEpi = async (epiId: number, isViolated: boolean) => {
        if (isViolated) {
            await attestNegative(epiId);
        } else {
            await attestAffirmative(epiId);
        }
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

