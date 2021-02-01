import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useQuery, gql, useMutation } from '@apollo/client'

// Actions
import * as Actions from '../../../../Store/actions'

// Services
import { createClient } from '../../../../Services'

const ADD_PRODUCT = gql`
mutation($name: String, $category: String, $description: String){
  addProduct(
    name: $name,
    category: $category,
    description: $description
  ) {
    name
    category
    description
  }
}
`

export default function FormDialog (props) {
  const dispatch = useDispatch()
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [addProduct] = useMutation(ADD_PRODUCT)

  const handleClose = () => {
    props.setDisplayDialog(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    addProduct({ variables: { name: nombre, category: categoria, description: descripcion } })
    props.updateProductList()
    props.setDisplayDialog(false)
  }

  return (
    <div>
      <Dialog open={props.displayDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Nuevo Producto</DialogTitle>
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
            label="Categoria"
            type="text"
            fullWidth
            required
            onChange={e => setCategoria(e.target.value)}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Descripcion"
            type="text"
            fullWidth
            required
            multiline
            onChange={e => setDescripcion(e.target.value)}
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
