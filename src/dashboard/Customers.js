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

export default function Customers() {
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
    user_type: "Wholesaler",
    password: values.password,
  }

return (
  <React.Fragment>
    <Title>Orders</Title>
    
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
            .filter(user => user.user_type == "Wholesaler")
            .map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.user_type}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
          ) ) }
      </TableBody>
    </Table>
  </React.Fragment>
);
}