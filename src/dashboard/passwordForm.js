import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VerifiedUser from '@material-ui/icons/VerifiedUser'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import queryString from 'query-string';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.secondary.black,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
}));

export default function PasswordForm() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    passwordConfirmation: '',
    tokenising: false
  });
  const id = localStorage.getItem('user_id');
  const params = {
    //Query String parses the search parameters in the URL. 
    //.email extracts email parameter out of it
    password: values.password,
    passwordConfirmationl: values.passwordConfirmation
  }
  
  const handleLogin = event => {
    event.preventDefault();
    axios.post(`https://agile-badlands-70924.herokuapp.com/api/v1/password_resets/${id}`, params, {
      headers: {
        'content-type': 'application/json',
      },
    }
    )
    .then(response => console.log(response.data),
      setValues({tokenising:true})
      )
    .catch(error => console.log(error))
  }; 

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
              {
            values.tokenising?<Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Congratulations — <strong>You have successfully changed password!</strong>
            </Alert> 
            : null
          }
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUser />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update your Password
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
            id="password"
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange('password')}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="passwordConfirmation"
            label="Confirm Password"
            name="passwordConfirmation"
            type="password"
            value={values.passwordConfirmation}
            onChange={handleChange('passwordConfirmation')}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          Reset Password
          </Button>
        </form>
      </div>
    </Container>
  );
}