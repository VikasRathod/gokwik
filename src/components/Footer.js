import React from 'react'
import Grid from '@mui/material/Grid';
import Gokwik from '../resource/gokwik.png';
import '.././resource/cssFiles/mamaEarthStyle.css'

export default function Footer() {
  return (
    <div className='center'>
      <Grid mt={5} item>
        <p>Powered By </p>
        <p style={{paddingTop: '8px'}}><img height="20px" src={Gokwik} alt="logo" /></p>
      </Grid>
    </div>
  )
}
