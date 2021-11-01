import Grid from '@mui/material/Grid';
import Gokwik from '../resource/gokwik.png';
import '.././resource/cssFiles/mamaEarthStyle.css';
import { Box } from '@mui/system';
import Footer from './Footer';

function CODPage() {
  return (
    <>
      <Box
        sx={{
          height: '500px',
        }}
      >
        <Grid item xs={12}>
          <img height="20px" src={Gokwik} alt="gokwik" />
          <hr />
        </Grid>

        <div className='center'>
          <Grid item xs={12}>
            <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Order successfully placed!</p>
          </Grid>

          <Grid item xs={12}>
            <p>Order is confirmed and is being processed by merchant.</p>
          </Grid>
        </div>
      </Box>
      <Footer />
    </>
  )
}

export default CODPage;
