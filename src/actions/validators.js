import { Jurisdiction } from '../contracts'
import FetchingActions from './fetching'
import * as ActionTypes from '../actiontypes'
import { JURISDICTION_ADDRESS } from '../constants'
import Network from "../network";

const ValidatorsActions = {

  findAll() {
    return async function(dispatch) {
      const jurisdiction = await Jurisdiction.at(JURISDICTION_ADDRESS)
      const events = jurisdiction.ValidatorAdded({}, { fromBlock: 0, toBlock: 'latest' });
      events.watch(function(error, result) {
        if(error) throw error
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
