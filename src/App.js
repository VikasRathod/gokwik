import React, { useState } from 'react'
import './App.css';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import UPIPage from './components/UPIPage';
import CODPage from './components/CODPage';
import InputForm from './components/InputForm';
import axios from 'axios';

// below import can be using to check device using library
// import {
//   isDesktop,
//   isIOS,
//   isAndroid
// } from "react-device-detect";


function App() {

  const [showForm, setshowForm] = useState(false);
  const [formdata, setFormData] = useState('');

  const userObject = {
    address: 'New York',
    name: 'Blizz',
    phoneNumber: 9789456123,
    email: 'company@gmail.com'
  }

  const orderObject = {
    orderType: 'upi',
    amount: 576
  }

  /**
   * below code is to check what type of device browser is openend on
   */
  let browser = navigator.userAgent;
  let isDesktop = browser.includes('Windows');
  let isIOS = browser.includes('iPhone') || browser.includes('iPad');
  let isAndroid = browser.includes('Android');

  /**
   * below method is to check userObject and according make a call to API (UPI Button), if empty it opens form
   * @param {data} data 
   */
  const upiHandleChange = (data) => {
    if (Object.keys(userObject).length > 0) {
      axios.get(`http://localhost:8080/${data}`)
        .then(response => console.log(response))
        .catch((err) => console.log(err))
    } else {
      setFormData(data);
      setshowForm(true);
    }
  }

  return (
    <Box m={3}>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        width='100%'
        spacing={1}
        height='80%'
      >

        {showForm ? <InputForm data={formdata} /> :
          orderObject.orderType === 'upi' ?
            <UPIPage
              isAndroid={isAndroid}
              isIOS={isIOS}
              isDesktop={isDesktop}
              orderObject={orderObject}
              userObject={userObject}
              upiHandleChange={upiHandleChange}
            /> :
            <CODPage />
        }
      </Grid>
    </Box>
  );
}

export default App;
