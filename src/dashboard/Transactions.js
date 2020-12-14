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
import CancelIcon from '@material-ui/icons/Cancel';
import axios from "axios";

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

export default function Transactions() {
  const classes = useStyles();
  const baseURL = 'https://agile-badlands-70924.herokuapp.com/api/v1/orders'

  const [values, setValues] = React.useState({
    add_success: false,
    name: '',
    email: '',
    password: '',
    user_list: []
  });
  const id = localStorage.getItem('user_id');
  React.useEffect(() => {
    
    axios.get(baseURL).then(response => {
      console.log(response.data)
      setValues({user_list: response.data.data})
    })
  }, []);
const handleRemove = uid => event => {
    event.preventDefault();
    const token = localStorage.getItem('token')
    axios.delete(baseURL + '/'+uid,
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

return (
  <React.Fragment>
    <Title>Transaction History</Title>
    
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell>Total Amount</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Order Status</TableCell>
          <TableCell>Date Delivered</TableCell>
          <TableCell>Product ID</TableCell>
          <TableCell>Ship Address</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          values.user_list && values.user_list
          .filter(prod => prod.user_id == id )
            .map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.total_amount} PKR</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.order_status}</TableCell>
                <TableCell>{row.delivered_at}</TableCell>
                <TableCell>{row.product_id}</TableCell>
                <TableCell>{row.ship_address}</TableCell>
                <TableCell><Button 
                  align= "left" 
                  color="inherit"
                  onClick={handleRemove(row.id)}
                ><span>Cancel</span></Button></TableCell>
              </TableRow>
          ) ) }
      </TableBody>
    </Table>
  </React.Fragment>
);
}