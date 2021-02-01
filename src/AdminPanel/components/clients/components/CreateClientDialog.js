import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

// Actions
import * as Actions from '../../../../Store/actions'

// Services
import { createClient } from '../../../../Services'

export default function FormDialog (props) {
  const dispatch = useDispatch()
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')

  const handleClose = () => {
    props.setDisplayDialog(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: nombre,
      company: empresa,
      email: email,
      phone: telefono
    }
    await createClient(data)
    dispatch(Actions.getClients())
    props.setDisplayDialog(false)
  }

  return (
    <div>
      <Dialog open={props.displayDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Nuevo Cliente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            required
            onChange={e => setNombre(e.target.value)}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Empresa"
            type="text"
            fullWidth
            required
            onChange={e => setEmpresa(e.target.value)}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            required
            onChange={e => setEmail(e.target.value)}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Telefono"
            type="text"
            fullWidth
            required
            onChange={e => setTelefono(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Crear
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
