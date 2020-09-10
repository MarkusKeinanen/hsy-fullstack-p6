import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const state = props.notification
  return (
    <div style={state.style}>
      {state.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification