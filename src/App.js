import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Store from './store'
import Alert from './Alert'
import NetworkActions from "./actions/network";
import Modal from "./Modal.react"
import Transparency from './Transparency';
import ValidateMe from './ValidateMe';

class App extends Component {

  componentWillMount() {
    Store.dispatch(NetworkActions.checkConnection())
  }

  render() {
    const network = this.props.network
    const fetching = this.props.fetching;

    return (network.connected) ?
      (fetching ?
       <Modal open={fetching} progressBar message={fetching}/> :
       <div>
         <Alert/>
         <Transparency/>
         <ValidateMe/>
       </div>
      ) :
      <div>
        <Modal dark open={!network.connected} message={'Please access using MIST or Metamask'}/>
      </div>
  }
}

function mapStateToProps({ fetching, network }) {
    return { fetching, network }
}


export default connect(mapStateToProps)(App);
