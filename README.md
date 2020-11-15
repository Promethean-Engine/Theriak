[![BCH compliance](https://bettercodehub.com/edge/badge/OdysseyMomentum/Theriak?branch=main&token=6cfe583531f390d980a981ccf7cf599417508777)](https://bettercodehub.com/)

# Theriak

Conflict Prevention - Digital Architecture for Peace

## Tech Stack

Theriak is built on top of Parity's [Substrate](https://github.com/paritytech/substrate) platform. It is designed with GRANDPA/BABE consensus, the same PoS consensus algorithms used for Polkadot. Frontend is built with React and the Polkadot.js libraries for interacting with substrate chains.




## How to run

- change your directory to `theriak-node` and run `cargo build --release`
  - run the blockchain development node with `./target/release/theriak --dev`
- run `npm install` in `theriak-frontend` and `theriak-frontend-user`
  - begin the frontends with `npm start` in both `theriak-frontend` and `theriak-frontend-user`
- Interact with the blockchain explorer by opening [polkadot.js](https://polkadot.js.org/apps/#/explorer)



