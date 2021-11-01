import React from 'react';
import Grid from '@mui/material/Grid';
import '.././resource/cssFiles/mamaEarthStyle.css'
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import axios from 'axios';

const InputForm = ({ data }) => {

  /**
   * method to call API when clicked on Send button
   * @param {data} formData 
   */
  const handleSubmitClick = (formData) => {
    axios.get(`http://localhost:8080/${data}`, formData)
      .then(response => console.log(response))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Box mt={4}>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              subject: '',
              message: ''
            }}
            validate={(values) => {
              let errors = {};
              if (!values.name) {
                errors.name = "Please enter Name";
              }
              if (!values.email) {
                errors.email = "Please enter Email";
              }
              if (!values.subject) {
                errors.subject = "Please enter Subject";
              }
              if (!values.message) {
                errors.message = "Please enter Message";
              }
              return errors;
            }}
            onSubmit={(data) => {
              handleSubmitClick(data);
            }}
          >
            {({ values, handleChange, errors }) => (
              <Form>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    label="Name"
                    name="name"
                    variant="outlined"
                    type="input"
                    value={values.name}
                    onChange={handleChange} />
                  {errors.name ? <div className="errorMsg">{errors.name}</div> : null}
                </Grid>

                <Grid mt={2} item xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    name="email"
                    variant="outlined"
                    type="input"
                    value={values.email}
                    onChange={handleChange} />
                  {errors.email ? <div className="errorMsg">{errors.email}</div> : null}
                </Grid>

                <Grid mt={2} item xs={12}>
                  <TextField
                    id="subject"
                    label="Subject"
                    name="subject"
                    variant="outlined"
                    type="input"
                    value={values.subject}
                    onChange={handleChange} />
                  {errors.subject ? <div className="errorMsg">{errors.subject}</div> : null}
                </Grid>

                <Grid mt={2} item xs={12}>
                  <TextField
                    id="message"
                    label="Message"
                    name="message"
                    variant="outlined"
                    multiline
                    rows={4}
                    type="input"
                    value={values.message}
                    onChange={handleChange} />
                  {errors.message ? <div className="errorMsg">{errors.message}</div> : null}
                </Grid>

                <Grid mt={2} item xs={12} >
                  <div className='center'>
                    <Button
                      variant="contained"
                      type="submit"
                      color="inherit"
                    >
                      SEND</Button>
                  </div>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Box>
    </>
  )
}

export default InputForm;
