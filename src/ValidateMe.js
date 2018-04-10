import React, { Component } from 'react';
import { connect } from 'react-redux'

import Store from './store'

//import NetworkActions from "./actions/network";
import AccountActions from "./actions/accounts";
import ValidationActions from "./actions/validation";

class ValidateMe extends Component {

  validate(address) {
    Store.dispatch(ValidationActions.validate(this.props.address));
  }

  componentWillMount() {
    Store.dispatch(AccountActions.findAccount());
    Store.dispatch(ValidationActions.checkValidated("0x1f3a8427250a6c580853dae603d02eeb93b55ed0"));
    //Store.dispatch(ValidationActions.checkValidated(this.props.address));
  }

  render() {
    return (
      <div>
        <p>My address is { this.props.address }</p>
        <p>Am I validated? { this.props.isValidated ? "Yes" : "No" }</p>

        <button onClick={ () => this.validate(this.props.address) }>Validate me</button>
      </div>
    )
  }
}

function mapStateToProps({ accounts, validations }) {
  return { address: accounts.address, isValidated: validations.isValidated };
}

export default connect(mapStateToProps)(ValidateMe);
