import React, { Component } from 'react'
import { connect } from 'react-redux'

import ValidatorsActions from '../actions/validators'

class ValidatorsList extends Component {
  componentWillMount() {
    this.props.findAll();
  }

  render() {
    const validators = this.props.validators.list
    return (
      <div>
        <p>Validators:</p>
        { validators.length === 0 ? (
            <em>No validators</em>
          ) : (
            <ul>{this._buildValidatorsList(validators)}</ul>
          )
        }
      </div>
    )
  }

  _buildValidatorsList(validators) {
    return validators.map((validator) => {
      return (
        <li key={validator}>
          <b>{validator}</b>
        </li>
      )
    })
  }
}

function mapStateToProps({ validators }) {
    return { validators }
}

function mapDispatchToProps(dispatch) {
  return({
    findAll: () => dispatch(ValidatorsActions.findAll())
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidatorsList);
