
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import CardHeader from '@material-ui/core/CardHeader';
import Popup from "./Popup";
import Alert from '@material-ui/lab/Alert';
//import { login } from "../actions/auth";
import MuiAlert from "@material-ui/lab/Alert";

//import AlertTitle from '@material-ui/lab/AlertTitle';
import { AlertTitle } from '@material-ui/lab';
//import { ReactComponent as Logo } from './logo.svg';
import React, { Component } from "react";
import { render } from "react-dom";
import {
 
  Switch,
 // Link,
  Redirect
} from "react-router-dom";
//import handleLogin from './postRequest.js'


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor:theme.palette.secondary.black,
    },
  },

  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
 
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
   X: {
    margin: theme.spacing(3, 1, 2),
  },

}));


export default function LogIn() {
  const classes = useStyles();
  
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    log_success: false,
    log_error: false,
    //isUserAuth: false
    isManufacturer: false,
    isDistriutor: false,
    isWholesaler: false
  });

  //Need to find what it is used for. Otherwise remove
  const [openPopup, setOpenPopup] = React.useState(false);
  
  const params = {
    email: values.email,
    password: values.password
  }
  
  //const successful = React.useState()
  
  const handleLogin = event => {
    event.preventDefault();
    const baseURL = 'https://agile-badlands-70924.herokuapp.com/' 
    axios.post(baseURL + 'api/v1/login', params, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => {
        console.log(response.data)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('user_id', response.data.user_id)
        localStorage.setItem('user_type', response.data.user_type)

        setValues({log_success: true}, () => {setTimeout(() => setValues({
          log_success: false,
        }))}, 4000)
        if(response.data.user_type == "Manufacturer") {
            setValues({isManufacturer: true})
          } else if (response.data.user_type == "Distributor") {
            setValues({isDistriutor: true})
          } else if (response.data.user_type == "Wholesaler") {
            setValues({isWholesaler: true})
          }
      }
    )
      .catch(error => {
        console.log(error)
        setValues({log_error: true}, () => {
          setTimeout(() => setValues({log_error: false}))
        }, 4000)
        localStorage.clear()
      }
    )
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    //<>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {
        values.log_success ?
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Congratulations — <strong>You have successfully signed-in!</strong>
          </Alert> : null
      }
      {    
        values.log_error ?
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Oh, there is something wrong. — <strong>Please check it out!</strong>
          </Alert> : null
      }
      <div className={classes.paper}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        
        <form 
          className={classes.form}
          onSubmit={handleLogin} 
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange('email')}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange('password')}
            //autoFocus
          />
          {/* Remember me not functional yet
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />*/}
          {
            values.isWholesaler ? <Redirect to='/wholeDash' /> : null
          }
          {
            values.isDistriutor ? <Redirect to='/distDash' /> : null
          }
          {
            values.isManufacturer ? <Redirect to='/manuDash' /> : null
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            //onClick={submitForm}

            onClick = {() => setOpenPopup(true)}
            
            //onClick = {() => setOpenPopup(false)}
          >
            Sign In
          </Button>
          
          
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2" color="primary">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
      // <Popup
      // title = "Success"
      // openPopup = {openPopup}
      // setOpenPopup = {setOpenPopup}
      // >
      // </Popup>
    //</>
  );
}