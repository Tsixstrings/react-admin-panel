import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { Icon, Grid, Button } from '@material-ui/core'

// Actions
import * as Actions from '../Store/actions'

// COMPONENTS
import Clients from './components/clients/clients'
import Products from './components/products/products'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}))

export default function PermanentDrawerLeft () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [itemSelected, setItemSelected] = useState(1)

  const RenderContent = () => {
    switch (itemSelected) {
      case 1: return <Clients />
      case 2: return <Products />
      default: return <Clients />
    }
  }

  const handleLogout = () => {
    dispatch(Actions.setUserLogout())
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>hola</div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Grid container>
                <Grid item xs={6}>
                <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
                </Grid>
                <Grid item xs={6} className="text-right">
                    <Button onClick={handleLogout} variant="contained" color="default">Logout</Button>
                </Grid>
            </Grid>

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem onClick={e => setItemSelected(1)} button key="clients">
              <ListItemIcon><Icon>group</Icon></ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItem>
            <ListItem onClick={e => setItemSelected(2)} button key="products">
              <ListItemIcon><Icon>storefront</Icon></ListItemIcon>
              <ListItemText primary="Productos" />
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <RenderContent />
              </main>
    </div>
  )
}
