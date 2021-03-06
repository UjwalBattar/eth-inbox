const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {
    interface,
    bytecode
} = require('./compile');

const {
    myMnemonic,
    myInfuraLink
} = require('./config');

const provider = new HDWalletProvider(
    myMnemonic,
    myInfuraLink
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['Hi there!']
        })
        .send({
            gas: '1000000',
            from: accounts[0]
        });

    console.log('Constract deployed to ', result.options.address);
}

// rinkeby,etherscan.io
// remix.ethereum.org
// look into geth and parody

deploy();