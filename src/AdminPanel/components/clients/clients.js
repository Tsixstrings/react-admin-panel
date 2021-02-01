import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as Actions from '../../../Store/actions'
import Loading from '../shared/Loading'
import CreateClientDialog from './components/CreateClientDialog'
import EditClientDialog from './components/EditClientDialog'

// Services
import { deleteClient } from '../../../Services'

import MaterialTable from 'material-table'

export default function Clients () {
  const dispatch = useDispatch()
  const clients = useSelector(state => state.clients)
  const [displayDialog, setDisplayDialog] = useState(false)
  const [displayEditDialog, setDisplayEditDialog] = useState(false)
  const [currentClient, setCurrentClient] = useState(false)

  useEffect(() => {
    dispatch(Actions.getClients())
  }, [dispatch])

  const handleShowEditModal = (rowData) => {
    setCurrentClient(rowData)
    setDisplayEditDialog(true)
  }

  const handleDeleteClient = async (rowData) => {
    await deleteClient(rowData.id)
    dispatch(Actions.getClients())
  }

  if (!clients) {
    return <Loading />
  }

  return (
        <div style={{ maxWidth: '100%' }}>
          <MaterialTable
            columns={[
              { title: 'Nombre', field: 'name' },
              { title: 'Empresa', field: 'company' },
              { title: 'Email', field: 'email' },
              { title: 'Telefono', field: 'phone' }
            ]}
            data={clients.data}
            title="Clientes"
            actions={[
              {
                icon: 'edit',
                tooltip: 'Editar',
                onClick: (event, rowData) => handleShowEditModal(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Eliminar',
                onClick: (event, rowData) => handleDeleteClient(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Nuevo Cliente',
                isFreeAction: true,
                onClick: (event) => setDisplayDialog(true)
              }
            ]}
          />
          <CreateClientDialog
          displayDialog={displayDialog}
          setDisplayDialog={setDisplayDialog}
          />
          {currentClient &&
                    <EditClientDialog
                    displayEditDialog={displayEditDialog}
                    setDisplayEditDialog={setDisplayEditDialog}
                    client={currentClient}
                    setCurrentClient={setCurrentClient}
                    />
          }
        </div>
  )
}
