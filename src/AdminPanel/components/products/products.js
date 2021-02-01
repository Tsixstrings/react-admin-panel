import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, gql, useMutation } from '@apollo/client'
import MaterialTable from 'material-table'
import { RateReviewOutlined } from '@material-ui/icons'

import * as Actions from '../../../Store/actions'

// components
import CreateProductDialog from './components/CreateProductDialog'
import EditProductDialog from './components/EditProductDialog'

const GET_PRODUCTS = gql`
query getProducts{
  products{
    id
    name
    category
    description
  }
}
`

const DELETE_PRODUCT = gql`
mutation($id: Int){
  deleteProduct(
    id: $id,
  ) {
    name
    category
    description
  }
}
`

export default function Products () {
  const dispatch = useDispatch()
  const [displayDialog, setDisplayDialog] = useState(false)
  const [displayEditDialog, setDisplayEditDialog] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(false)
  const products = useSelector(state => state.products)
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS)
  const [deleteProduct] = useMutation(DELETE_PRODUCT)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : </p>
  dispatch(Actions.setProducts(data))
  if (!products) return <p>Loading...</p>
  console.log('productos recibidos', data)
  const arrayData = []
  Object.values(products).map(row => {
    const newObject = {
      id: row.id,
      name: row.name,
      category: row.category,
      description: row.description
    }
    arrayData.push(newObject)
  })
  console.log('Despues de procesar:', arrayData)

  const handleDisplayModalEditar = (rowData) => {
    setCurrentProduct(rowData)
    setDisplayEditDialog(true)
  }

  const handleDeleteProduct = (rowData) => {
    if (confirm(`Desea eliminar el producto ${rowData.id}???`)) {
      deleteProduct({ variables: { id: rowData.id } })
      refetch()
    }
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'Nombre', field: 'name' },
          { title: 'Categoria', field: 'category' },
          { title: 'Descripcion', field: 'description' }
        ]}
        data={arrayData}
        title="Productos"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar',
            onClick: (event, rowData) => handleDisplayModalEditar(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar',
            onClick: (event, rowData) => handleDeleteProduct(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Nuevo Producto',
            isFreeAction: true,
            onClick: (event, rowData) => setDisplayDialog(true)
          },
          {
            icon: 'update',
            tooltip: 'Actualizar',
            isFreeAction: true,
            onClick: (event, rowData) => refetch()
          }
        ]}
      />
      <CreateProductDialog
      displayDialog={displayDialog}
      setDisplayDialog={setDisplayDialog}
      updateProductList={refetch}
      />
      {currentProduct &&
                <EditProductDialog
                displayEditDialog={displayEditDialog}
                setDisplayEditDialog={setDisplayEditDialog}
                product={currentProduct}
                setCurrentProduct={setCurrentProduct}
                updateProductList={refetch}
                />
      }
    </div>
  )
}
