import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Store from './store'

//const store = createStore((state) => state || { rootDAO: '0xdeadbeef' })

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
