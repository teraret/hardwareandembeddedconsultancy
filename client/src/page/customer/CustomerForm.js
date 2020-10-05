import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, ButtonGroup, LinearProgress } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneAndroid from "@material-ui/icons/PhoneAndroid";
import Email from "@material-ui/icons/Email";
import Home from "@material-ui/icons/Home";
import Contacts from "@material-ui/icons/Contacts";
import { Formik, Form } from "formik";
import { createCustomer } from "./../../redux/index";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
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

function CustomerForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const customerdata = useSelector((state) => state.customerCreate);
  const [result, setResult] = React.useState(false);
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    address: "",
  };

  const done = () => {
    setResult(false);
    props.refresh();
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper className={classes.paper}>
          <Formik
            initialValues={initialValues}
            validationSchema={customerCreateSchema}
            onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
              setTimeout(() => {
                dispatch(createCustomer(values));
                setSubmitting(false);
                setResult(true);
                resetForm(initialValues);
                console.log(values);
              }, 2000);
              props.refresh();
            }}
          >
            {({
              submitForm,
              isSubmitting,
              handleChange,
              resetForm,
              touched,
              errors,
              values,
            }) => (
              <Form>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-full-width"
                    name="name"
                    label="Name"
                    value={values.name || ""}
                    onChange={handleChange}
                    style={{ margin: 8 }}
                    placeholder="Name"
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
                  <TextField
                    id="outlined-full-width"
                    name="email"
                    label="Email"
                    value={values.email || ""}
                    onChange={handleChange}
                    style={{ margin: 8 }}
                    placeholder="E-Mail"
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
                  <TextField
                    id="outlined-full-width"
                    label="Mobile"
                    name="mobile"
                    value={values.mobile || ""}
                    onChange={handleChange}
                    style={{ margin: 8 }}
                    type="number"
                    placeholder="Mobile"
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
                  <TextField
                    id="outlined-full-width"
                    label="Address"
                    name="address"
                    value={values.address || ""}
                    onChange={handleChange}
                    style={{ margin: 8 }}
                    placeholder="Address"
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
                <Grid item xs={12}>
                  {isSubmitting && <LinearProgress />}
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Save
                    </Button>
                    <Button variant="contained">Search</Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Form>
            )}
          </Formik>

          {customerdata.error ? (
            <Collapse in={result}>
              <Alert severity="error">
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  {customerdata.error} <Button onClick={done}>ok</Button>
                </Grid>
              </Alert>
            </Collapse>
          ) : null}

          {customerdata.show ? (
            <Collapse in={result}>
              <Alert>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  {customerdata.show.id ? (
                    <Grid item xs={12}>
                      Id {customerdata.show.id} Created
                    </Grid>
                  ) : null}
                  {customerdata.show.name ? (
                    <Grid item xs={12}>
                      Name:{customerdata.show.name}
                    </Grid>
                  ) : null}
                  {customerdata.show.email ? (
                    <Grid item xs={12}>
                      E-Mail:{customerdata.show.email}
                    </Grid>
                  ) : null}
                  {customerdata.show.mobile ? (
                    <Grid item xs={12}>
                      Mobile:{customerdata.show.mobile}
                    </Grid>
                  ) : null}
                  {customerdata.show.address ? (
                    <Grid item xs={12}>
                      Address:{customerdata.show.address}
                    </Grid>
                  ) : null}
                  {customerdata.show.id ? (
                    <Grid item xs={12}>
                      <Button onClick={done}>ok</Button>
                    </Grid>
                  ) : null}
                </Grid>
              </Alert>
            </Collapse>
          ) : null}
        </Paper>
      </Grid>
    </div>
  );
}

export default CustomerForm;
