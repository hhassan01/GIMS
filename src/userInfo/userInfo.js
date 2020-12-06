import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
//import { login } from "../actions/auth";
import MuiAlert from "@material-ui/lab/Alert";

//import AlertTitle from '@material-ui/lab/AlertTitle';
import { AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: '',
    email: '',
    user_type: '',
    log_success: false,
    error: false,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  React.useEffect(() => {
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    axios.get('api/v1/users/' + user_id, {
      headers: {
        'Authorization': token,
      },
    })
    .then(response => {
      console.log(response.data)
      setValues({
        name: response.data.data.name,
        email: response.data.data.email,
        user_type: response.data.data.user_type
      })
    })
  }, []); 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          View User Information
        </Typography>
        <Table size="small">  
      <TableBody>
        {
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{values.name}</TableCell>
          </TableRow>
        }{
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{values.email}</TableCell>
          </TableRow>
        }{
          <TableRow>
            <TableCell>User Type</TableCell>
            <TableCell>{values.user_type}</TableCell>
          </TableRow>
        }
      </TableBody>
    </Table>
      </div>
    </Container>
  );
}