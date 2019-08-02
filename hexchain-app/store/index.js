import * as React from 'react'

let ContextOne = React.createContext()

let initialState = {
  auth: { status: 'loading' }
}

let reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, auth: action.payload }
    case 'logout':
      return initialState
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'set-color':
      return { ...state, currentColor: action.payload }
    default:
      return initialState
  }
}

function ContextOneProvider(props) {
  // [A]
  let [state, dispatch] = React.useReducer(reducer, initialState)
  let value = { state, dispatch }

  // [B]
  return (
    <ContextOne.Provider value={value}>{props.children}</ContextOne.Provider>
  )
}

let ContextOneConsumer = ContextOne.Consumer

// [C]
export { ContextOne, ContextOneProvider, ContextOneConsumer }
