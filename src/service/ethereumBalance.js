const {Web3} = require('web3')

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/d094bbadf007438e84681cca1b70a6e3')

const web3 = new Web3(provider);

const getBalance = async(accountAddress) => {
    try {
        const balance = await web3.eth.getBalance(accountAddress);
        const ether = web3.utils.fromWei(balance, 'ether')
        return ether;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = getBalance;