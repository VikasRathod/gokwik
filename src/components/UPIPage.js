import Grid from '@mui/material/Grid';
import logo from '../resource/mamaEarth.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import '.././resource/cssFiles/mamaEarthStyle.css'
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { Box } from '@mui/system';
import Footer from './Footer';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const UPIPage = ({ isDesktop, isIOS, isAndroid, orderObject, userObject, upiHandleChange }) => {

  let paymentOption = ['PhonePe', 'GooglePay', 'paytm', 'BHIM'];

  const styles = {
    color: 'white',
    width: '100%',
    background: '#004b8d',
    border: 'none',
    borderRadius: '10px',
    margin: '0.5rem 0',
    padding: '0 1rem',
    height: '52px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  }

  /**
   * method to call API when clicked on send button, with phone number being validated
   * @param {data} data 
   * @returns 
   */
  const handleSendClick = (data) => {
    const dataToSend = {
      number: data.number,
      amount: orderObject ? orderObject.amount : null
    }
    axios.post('http://localhost:8080/send', dataToSend)
      .then(response => console.log(response))
      .catch((err) => console.log(err));
  }

  
  return (
    <>
      <Box>
        <Grid item xs={12}>
          <img height="20px" src={logo} alt="logo" />
          <hr />
        </Grid>

        <Grid mb={2} item xs={12}>
          <p>Amount to Pay: <span className='amountTextColor'> &#8377;{orderObject ? orderObject.amount : null}</span></p>
        </Grid>

        <Grid item xs={12}>
          <Card m={2} variant="outlined" style={{ backgroundColor: '#e8f4f8 ' }}>
            <CardContent>
              <Grid mb={3} item xs={12}>
                <Typography variant="h6">Pay using UPI Apps</Typography>
              </Grid>

              <Grid item xs={12}>
                {
                  isDesktop ? <div className='center'> No payment options available</div> :
                    paymentOption.map((data, i) => {
                      if (isAndroid) {
                        return <Button
                          key={i}
                          style={styles}
                          onClick={() => upiHandleChange(data)}
                          endIcon={<SendIcon />}
                        >
                          {data}</Button>
                      }
                      else if (isIOS && (data === 'PhonePe' || data === 'GooglePay')) {
                        return <Button
                          key={i}
                          style={styles}
                          onClick={() => upiHandleChange(data)}
                          endIcon={<SendIcon />}
                        >
                          {data}</Button>
                      } else {
                        return null
                      }
                    })
                }
              </Grid>

              <Grid item xs={12}><h5>OR</h5></Grid>

              <Grid item xs={12}>
                <Typography style={{ fontWeight: 'bold' }}>Get Payment Link</Typography>
              </Grid>


              <Grid item xs={12}>
                <p>You will get payment link on</p>
              </Grid>

              <Grid item xs={12}>
                <Formik
                  initialValues={{
                    number: userObject.phoneNumber,
                  }}
                  validate={(values) => {
                    let errors = {};
                    if (!values.number) {
                      errors.number = "Please enter contact number";
                    }
                    return errors;
                  }}
                  onSubmit={(data) => {
                    handleSendClick(data);
                  }}
                >
                  {({ values, handleChange, errors }) => (
                    <Form>
                      <Grid container spacing={0} >

                        <Grid item xs={9}>
                          <TextField
                            id="number"
                            name="number"
                            style={{ width: '95%' }}
                            variant="standard"
                            type="input"
                            value={values.number}
                            onChange={handleChange} />
                          {errors.number ? <div className="errorMsg">{errors.number}</div> : null}
                        </Grid>

                        <Grid item xs={2} >
                          <Button
                            variant="contained"
                            type="submit"
                            color="inherit"
                          >
                            SEND</Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12}>
          <Grid item xs={12}>
            <p style={{ fontWeight: 'bold' }}>Get WhatsApp and SMS Updates</p>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Typography>Click on this to turn off updates</Typography>
            </Grid>

            <Grid item xs={2}>
              <Switch {...label} defaultChecked color="primary" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

export default UPIPage;
