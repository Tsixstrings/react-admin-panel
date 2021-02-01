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
import { updateClient } from '../../../../Services'

export default function FormDialog (props) {
  const dispatch = useDispatch()
  const [nombre, setNombre] = useState(false)
  const [empresa, setEmpresa] = useState(false)
  const [email, setEmail] = useState(false)
  const [telefono, setTelefono] = useState(false)

  console.log('este es el valor actual!!: ', props.client)

  const handleClose = () => {
    props.setDisplayEditDialog(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: nombre || props.client.name,
      company: empresa || props.client.company,
      email: email || props.client.email,
      phone: telefono || props.client.phone
    }
    await updateClient(data, props.client.id)
    dispatch(Actions.getClients())
    props.setDisplayEditDialog(false)
  }

  return (
    <div>
      <Dialog open={props.displayEditDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Editar Cliente</DialogTitle>
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
            defaultValue={props.client.name}
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
            defaultValue={props.client.company}
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
            defaultValue={props.client.email}
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
            defaultValue={props.client.phone}
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
