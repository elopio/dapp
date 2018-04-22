import React, { Component } from 'react';
import { connect } from 'react-redux';

class Account extends Component {

  render() {
    return (
      <div>
        <p>My address is { this.props.address }</p>
      </div>
    );
  }

}

function mapStateToProps({ accounts }) {
  return { address: accounts.address };
}

export default connect(
  mapStateToProps,
)(Account);
