import React, { Component } from 'react'
import { connect } from 'react-redux'

import JurisdictionActions from '../actions/jurisdiction'
import ValidatorsList from './ValidatorsList.react'


const RootDAO = connect(({jurisdiction}) => ({jurisdiction}))((props) => {
  return <p>RootDAO: { props.jurisdiction.owner } </p>
})

class Transparency extends Component {
  componentWillMount() {
    this.props.find()
  }

  render() {
    return (
      <div className="App">
        <h1>Jurisdiction</h1>
        <RootDAO />
        <ValidatorsList />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    find: () => dispatch(JurisdictionActions.find())
  });
}

export default connect(() => {}, mapDispatchToProps)(Transparency);
