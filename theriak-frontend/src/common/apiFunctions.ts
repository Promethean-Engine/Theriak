import hex2ascii from 'hex2ascii';
import {
    web3Accounts,
    web3Enable,
    web3FromAddress,
    web3ListRpcProviders,
    web3UseRpcProvider,
    web3FromSource
} from '@polkadot/extension-dapp';
// Import Keyring class and utility functions
import { Keyring } from '@polkadot/keyring';
import { stringToU8a } from '@polkadot/util';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Epi } from '../dataTypes';

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
        .signAndSend(account.address, { signer: injector.signer }, (result) => {
            console.log(`Current status is ${result.status}`);

            if (result.status.isInBlock) {
                alert(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
                alert(`Transaction is finalized at blockHash ${result.status.asFinalized}`)
            }
        });
}

async function raiseInvestigation(id: number) {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    const allInjected = await web3Enable('Theriak Frontend');
    const allAccounts = await web3Accounts();
    let account = allAccounts[0]
    const injector = await web3FromSource(account.meta.source);
   
    const investExtrinsic = api.tx.peaceIndicators
        .raiseInvestigation(id)
        .signAndSend(account.address, { signer: injector.signer }, (result) => {
            console.log(`Current status is ${result.status}`);

            if (result.status.isInBlock) {
                alert(`Investigation raised and included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
                alert(`Transaction is finalized at blockHash ${result.status.asFinalized}`)
            }
        })
}

async function submitEpis(epis: Array<string>) {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    const allInjected = await web3Enable('Theriak Frontend');
    const allAccounts = await web3Accounts();
    let account = allAccounts[1]
    const injector = await web3FromSource(account.meta.source);

    const submitEpisExt = api.tx.sudo.sudo(
        api.tx.peaceIndicators
        .sudoSubmitNewIndicatorSet(epis)
    ).signAndSend(account.address, { signer: injector.signer }, (result) => {
            console.log(`Current status is ${result.status}`);

            if (result.status.isInBlock) {
                alert(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
                alert(`Transaction is finalized at blockHash ${result.status.asFinalized}`)
            }
        });
}

const chainEpiList = async (): Promise<Array<Epi>> => {
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

export { submitEpis, chainEpiList, attestNegative, attestAffirmative, raiseInvestigation }
