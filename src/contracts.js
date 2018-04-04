import Network from './network'
import contract from 'truffle-contract'

const provider = Network.provider();

const Jurisdiction = contract(require('../build/contracts/Jurisdiction.json'));
Jurisdiction.setProvider(provider);

export {
  Jurisdiction,
}
