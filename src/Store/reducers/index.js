import * as Actions from '../actions'

const initialState = {
  loggedUser: false,
  clients: null,
  products: null
}

// Use the initialState as a default value
export default function globalReducer (state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case Actions.GET_CLIENTS:
      return {
        ...state,
        clients: action.payload
      }
    case Actions.SET_USER_LOGGED:
      return {
        ...state,
        loggedUser: true
      }
    case Actions.SET_USER_LOGOUT:
      return {
        ...state,
        loggedUser: false
      }
    case Actions.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products
      }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}
