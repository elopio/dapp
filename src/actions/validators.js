import { Jurisdiction } from '../contracts'
import AlertActions from './alerts'
import FetchingActions from './fetching'
import * as ActionTypes from '../actiontypes'
import { JURISDICTION_ADDRESS } from '../constants'
import Network from "../network";

const ValidatorsActions = {

  findAll() {
    return async function(dispatch) {
      const jurisdiction = await Jurisdiction.at(JURISDICTION_ADDRESS)
      // FIXME this is very slow. We have to add a function to the Jurisdiction
      // contract that returns all the validators.
      // See https://github.com/TPL-protocol/tpl-contracts/issues/2
      // --elopio - 20180704
      const events = jurisdiction.ValidatorAdded({}, { fromBlock: 0, toBlock: 'latest' });
      events.watch(function(error, result) {
        if(error) AlertActions.showError(error)
        else dispatch(ValidatorsActions.add(result.args.validator))
      })
    }
  },

  add(validator) {
    return async function(dispatch) {
      dispatch({ type: ActionTypes.ADD_VALIDATOR, validator })
    }
  },
}

export default ValidatorsActions
