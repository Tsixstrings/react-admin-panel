import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Login from './Login/Login'
import AdminPanel from './AdminPanel/AdminPanel'

function App () {
  const loggedUser = useSelector(state => state.loggedUser)
  console.log('Este es el estado de login:', loggedUser)

  if (!loggedUser) {
    return <Login />
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <AdminPanel />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
