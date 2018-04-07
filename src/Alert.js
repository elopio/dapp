import React from 'react'
import Store from './store'
import { connect } from 'react-redux'
import AlertActions from './actions/alerts'

class Alert extends React.Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.alert !== this.props.alert) setTimeout(() => Store.dispatch(AlertActions.reset()), 5000)
  }

  render() {
    const alert = this.props.alert;
    return !alert ? <div/> :
      <div>
        <p>{alert.message} <span onClick={this._cleanAlert}>x</span>
        </p>
      </div>
  }

  _cleanAlert = e => {
    e.preventDefault();
      Store.dispatch(AlertActions.reset());
  }
}

function mapStateToProps({ alert }) {
  return { alert }
}

export default connect(mapStateToProps)(Alert)
