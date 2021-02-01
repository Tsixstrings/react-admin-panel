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
import { updateClient } from '../../../../Services'

const UPDATE_PRODUCT = gql`
mutation($id: Int,$name: String, $category: String, $description: String){
  updateProduct(
    id: $id,
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
  const [updateProduct] = useMutation(UPDATE_PRODUCT)

  console.log('este es el valor actual!!: ', props.client)

  const handleClose = () => {
    props.setDisplayEditDialog(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: nombre || props.product.name,
      category: categoria || props.product.category,
      description: descripcion || props.product.description
    }
    updateProduct({
      variables: {
        id: props.product.id,
        name: data.name,
        category: data.category,
        description: data.description
      }
    })
    props.updateProductList()
    props.setDisplayEditDialog(false)
  }

  return (
    <div>
      <Dialog open={props.displayEditDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Editar Producto</DialogTitle>
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
            defaultValue={props.product.name}
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
            defaultValue={props.product.category}
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
            defaultValue={props.product.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Actualizar
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
