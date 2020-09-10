const initialState = {
  style: {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'none'
  },
  message: "hello",
  timeoutFunction: null
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      if (state.timeoutFunction !== null) {
        clearTimeout(state.timeoutFunction)
      }
      return {
        message: action.data.message,
        style: {
          ...state.style,
          ...action.data.style
        },
        timeoutFunction: action.data.timeoutFunction
      }
    }
    default:
      return state
  }
}

export const setNotification = (message, timeout, style) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        style: { display: 'block', ...style },
        timeoutFunction: setTimeout(() => {
          dispatch({
            type: 'SET_NOTIFICATION',
            data: {
              message: '',
              style: { display: 'none', ...style },
              timeoutFunction: null
            }
          })
        }, timeout)
      },
    })
  }
}


export default notificationReducer