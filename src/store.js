import React from 'react'
import thunkMiddleware from 'redux-thunk'
import network from './reducers/network'
import fetching from './reducers/fetching'
import jurisdiction from './reducers/jurisdiction'
import validators from './reducers/validators'
import { createStore, combineReducers, applyMiddleware } from 'redux'

const mainReducer = combineReducers({
  network,
  fetching,
  jurisdiction,
  validators,
});

const Store = createStore(
  mainReducer,
  applyMiddleware(thunkMiddleware)
);

export default Store;
