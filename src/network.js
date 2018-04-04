import Web3 from 'web3';
import { PROVIDER } from 'constants'

const Network = {
  web3() {
    return new Web3(this.provider())
  },

  eth() {
    return this.web3().eth;
  },

  provider() {
    if (typeof window.web3 !== 'undefined') return window.web3.currentProvider
    return new Web3.providers.HttpProvider(PROVIDER)
  },

}

export default Network
