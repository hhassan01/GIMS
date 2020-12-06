import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
     marginTop: theme.spacing(1),
    width: '105%',
  },
}));

export default function Manufacturers() {
  const classes = useStyles();


  const [values, setValues] = React.useState({
    add_success: false,
    name: '',
    email: '',
    password: '',
    user_list: []
  });

  React.useEffect(() => {
    axios.get('api/v1/users').then(response => {
      console.log(response.data)
      setValues({user_list: response.data.data})
    })
  }, []);

  const params = {
    name: values.name,
    email: values.email,
    user_type: "Manufacturer",
    password: values.password,
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('/api/v1/users', params, {
      headers: {
        'content-type': 'application/json',
      },
    }
    )
    .then(response => {
      console.log(response.data)
    })
  /*  .catch(error => console.log(error),
      setValues({error:true})
      )};*/ 
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const addManufacturer = () => {
    setValues({add_success:true})
  };
  
  const handleRemove = uid => event => {
    event.preventDefault();
    const token = localStorage.getItem('token')
    axios.delete('/api/v1/users/' + uid,
      {headers: {
              'Authorization': token
            }})
    .then(response => {
      console.log(response)
      window.location.reload(false)
    }).catch(error => {
      console.log(error)
    })
  }


  if (values.add_success)
  return (
    <React.Fragment>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" align='center'>
          Add Manufacturer
        </Typography>
        <form 
          className={classes.root} 
          noValidate 
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField 
              margin="normal"
              required
              id="outlined-basic"
              label="Name"
              name="Name"
              id="Name"
              variant="outlined" 
              onChange={handleChange('name')}
              autoFocus
            />
          </div>

          <div>
            <TextField 
              id="email" 
              margin="normal" 
              label="Email" 
              name="Email"
              variant="outlined"
              required  
              onChange={handleChange('email')}
            />
          </div>
  
          <div>
            <TextField 
              id="Password" 
              margin="normal" 
              label="Password"
              name="Password" 
              variant="outlined"
              type="Password" 
              required  
              onChange={handleChange('password')}
            />
          </div>
   
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.form}
            >Add</Button>  
          </div>
        </form>
      </div>
    </React.Fragment>
  );
return (
  <React.Fragment>
    <form align="right">
      <Button 
        align= "right" 
        color="inherit" 
        onClick={addManufacturer}
      >Add Manufacturer</Button> 
    </form>
    
    <Title>Manufacturer List</Title>
    
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>User Type</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          values.user_list && values.user_list
            .filter(user => user.user_type == "Manufacturer")
            .map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.user_type}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <Button 
                  align= "left" 
                  color="inherit"
                  onClick={handleRemove(row.id)}
                >Remove</Button>
              </TableRow>
          ) ) }
      </TableBody>
    </Table>
  </React.Fragment>
);
}