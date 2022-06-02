import { Grid, Typography } from '@mui/material'
import React from 'react'
import svg_404 from './404.svg'
function Error() {
  return (
    <>
      <Grid container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item md={6} sm={6} lg={6} xs={6} mt={4}>
          <img src={svg_404} style={{ height: '100%', width: '100%' }} alt="error page" />
          <Typography variant='h4' textAlign='center' color='crimson' mt={2}>404 Not Found</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default Error