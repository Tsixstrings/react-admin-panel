import axios from 'axios'

export const SET_USER_LOGGED = 'SET_USER_LOGGED'
export const GET_CLIENTS = 'GET_CLIENTS'
export const SET_USER_LOGOUT = 'SET_USER_LOGOUT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export function getClients () {
  const request = axios.get('http://localhost:3001/clients')
  return (dispatch) => {
    request.then((response) => {
      console.log('Este es el resultado:', response)
      dispatch({
        type: GET_CLIENTS,
        payload: response
      })
    }
    )
  }
}

export function setUserLogged () {
  return (dispatch) => {
    dispatch({
      type: SET_USER_LOGGED
    })
  }
}

export function setUserLogout () {
  return (dispatch) => {
    dispatch({
      type: SET_USER_LOGOUT
    })
  }
}

export function setProducts (products) {
  return (dispatch) => {
    dispatch({
      type: SET_PRODUCTS,
      payload: products
    })
  }
}
