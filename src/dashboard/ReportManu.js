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
import Container from '@material-ui/core/Container';
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
function invoicetotal(items) {
  items = items.filter(status => status.order_status == "Delivered")
  items = items.filter(status => status.order_status == "Delivered")
  return items.map(({ total_amount }) => total_amount).reduce((sum, i) => sum + i, 0);
}
function itemtotal(items) {
  items = items.filter(status => status.order_status == "Delivered")
  return items.map(({ quantity}) => quantity).reduce((sum, i) => sum + i, 0);
}
export default function Reports() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    add_success: false,
    name: '',
    email: '',
    password: '',
    amount: 0,
    month_rep: false,
    order_list: [],
    order_list2:[]
  });

  React.useEffect(() => {
    const baseURL = 'http://agile-badlands-70924.herokuapp.com/' 
    axios.get(baseURL + 'api/v1/orders').then(response => {
      console.log(response.data)
      setValues({order_list: response.data.data})
      console.log("values.order_list2")

    })
  }, []);

  const monthlyRep = ()=> {
    setValues({month_rep:true});
  }; 
return(
    <React.Fragment>
    <Title>Report</Title>
    <form align= "right">
      <Button onClick={monthlyRep} color="inherit" >Current Month</Button> 
    </form>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell>Total Amount</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Order Status</TableCell>
          <TableCell>Date Delivered</TableCell>
          <TableCell>Product ID</TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
        {
          values.order_list && values.order_list
          .filter(status => status.order_status == "Delivered")
            .map(row => (
              <TableRow>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.total_amount} PKR</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.order_status}</TableCell>
                <TableCell>{row.delivered_at}</TableCell>
                <TableCell>{row.product_id}</TableCell>
              </TableRow>
          ) ) }
           <TableRow>
            <TableCell>Total Revenue</TableCell>
            <TableCell>{invoicetotal(values.order_list)} PKR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Items Sold</TableCell>
            <TableCell>{itemtotal(values.order_list)} units</TableCell>
          </TableRow>
      </TableBody>
    </Table>
  </React.Fragment>
  );
}