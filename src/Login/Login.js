import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Grid, Button, Paper, Icon, InputAdornment } from '@material-ui/core'
import JsonDb from './Users.json'

import * as Actions from '../Store/actions'

export default function Login () {
  const dispatch = useDispatch()
  const [pswVisibility, setPswVisibility] = useState(false)
  const [email, setEmail] = useState(false)
  const [password, setPassword] = useState(false)
  const [displayError, setDisplayError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setDisplayError(false)
    let userFound = false
    const availableUsers = JsonDb.users
    availableUsers.map(row => {
      if (row.email == email && row.password == password) {
        dispatch(Actions.setUserLogged())
        userFound = true
      }
    })
    if (!userFound) {
      setDisplayError(true)
    }
  }

  return (
    <Grid container className="flex items-center justify-center text-center">
      <form onSubmit={handleSubmit}>
      <Paper elevation={5} className="p-10 max-w-lg mt-10">
    <Grid container className="flex items-center justify-center text-center">
      <Grid item>
        <Grid container className="flex items-center justify-center text-center" >
        <Grid item xs={8}>
          <img src="assets/images/cecotec_logo.png" alt="logo" />
        </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className="p-2">
        <TextField
          fullWidth
          variant="outlined"
          color="default"
          label="Email"
          type="email"
          onChange={e => setEmail(e.target.value)}
          />
      </Grid>
      <Grid item xs={12} className="p-2">
      <TextField
        fullWidth
        variant="outlined"
        color="default"
        label="Password"
        type={pswVisibility ? 'text' : 'password'}
        onChange={e => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={e => setPswVisibility(!pswVisibility)} className="cursor-pointer">
              <Icon>{pswVisibility ? 'visibility' : 'visibility_off'}</Icon>
            </InputAdornment>
          )
        }}/>
      </Grid>
      {displayError &&
      <Grid item xs={12} className="text-red-700 font-bold">
        Usuario incorrecto
      </Grid>
      }
      <Grid item xs={12} className="p-5">
        <Button type="submit" variant="contained" color="default">Login</Button>
      </Grid>
    </Grid>
    </Paper>
    </form>
    </Grid>
  )
}
