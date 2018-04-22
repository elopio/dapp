import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.react'
import './index.css'
import { Provider } from 'react-redux'
  import { Web3Provider } from 'react-web3';
import Store from './store'

ReactDOM.render(
  <Provider store={Store}>
    <Web3Provider>
      <App />
    </Web3Provider>
  </Provider>,
  document.getElementById('root')
)
