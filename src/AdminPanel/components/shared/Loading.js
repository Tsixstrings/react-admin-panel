import React from 'react'
import { CircularProgress, Grid } from '@material-ui/core'

export default function Loading () {
  return (
        <Grid container className="flex items-center justify-center text-center">
            <Grid item xs={12}>
                <CircularProgress />
            </Grid>
            <Grid item xs={12}>
                Cargando...
            </Grid>
        </Grid>
  )
}
