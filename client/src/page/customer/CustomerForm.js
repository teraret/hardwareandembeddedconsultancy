import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, LinearProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneAndroid from "@material-ui/icons/PhoneAndroid";
import Email from "@material-ui/icons/Email";
import Home from "@material-ui/icons/Home";
import Contacts from "@material-ui/icons/Contacts";
import { Formik, Form, Field } from "formik";
import Axios from "axios";
import SERVER_URL from "../../config";
import * as yup from "yup";

let customerCreateSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  email: yup.string().email().required("This field is required."),
  mobile: yup
    .string()
    .min(10, "Mobile is too short.")
    .max(10, "Mobile is too long.")
    .required("This field is required."),
  address: yup.string(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function CustomerForm() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper className={classes.paper}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              mobile: "",
              address: "",
            }}
            validationSchema={customerCreateSchema}
            onSubmit={(values) => {
              Axios({
                method: "POST",
                url: SERVER_URL + "/customer",
                data: values,
              });
              console.log(values);
            }}
          >
            {({ submitForm, isSubmitting, handleChange, touched, errors }) => (
              <Form>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-full-width"
                    name="name"
                    label="Name"
                    onChange={handleChange}
                    style={{ margin: 8 }}
                    placeholder="Name"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Contacts />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    helperText={
                      errors.name && touched.name ? errors.name : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-full-width"
                    name="email"
                    label="Email"
                    onChange={handleChange}
                    style={{ margin: 8 }}
                    placeholder="E-Mail"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-full-width"
                    label="Mobile"
                    name="mobile"
                    onChange={handleChange}
                    style={{ margin: 8 }}
                    type="number"
                    placeholder="Mobile"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneAndroid />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    helperText={
                      errors.mobile && touched.mobile ? errors.mobile : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-full-width"
                    label="Address"
                    name="address"
                    onChange={handleChange}
                    style={{ margin: 8 }}
                    placeholder="Address"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Home />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    helperText={
                      errors.address && touched.address ? errors.address : null
                    }
                  />
                </Grid>
                {isSubmitting && <LinearProgress />}

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Create
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              // onClick={handleReset}
              fullWidth
            >
              Reset
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

export default CustomerForm;
