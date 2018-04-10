import React from 'react';
import * as ActionTypes from '../actiontypes'

const initialState = { address: ''};

const AccountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_ACCOUNT:
      return Object.assign({}, state, { address: action.address });
    default:
      return state
  }
};

export default AccountsReducer;
