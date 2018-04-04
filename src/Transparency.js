import React, { Component } from 'react'
import { connect } from 'react-redux'

import Store from './store'

import JurisdictionActions from './actions/jurisdiction'

const RootDAO = connect(({jurisdiction}) => ({jurisdiction}))((props) => {
  return <p>RootDAO: { props.jurisdiction.owner } </p>
})

const Validators = () => <p>Validators:</p>

class Transparency extends Component {
  componentWillMount() {
    Store.dispatch(JurisdictionActions.find())
  }

  render() {
    return (
      <div className="App">
        <h1>Transparency</h1>
        <RootDAO />
        <Validators />
      </div>
    )
  }
}


export default Transparency 
