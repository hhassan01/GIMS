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
  const mycart = localStorage.getItem('prod')
  const mycart2 = JSON.parse(mycart)
  const classes = useStyles();
  const [values, setValues] = React.useState({
    add_success: false,
    name: '',
    email: '',
    password: '',
    amount: 0,
    editID:'',
    editStatus:'',
    month_rep: false,
    order_list: [],
    order_list2:[]
  });
const baseURL = 'https://agile-badlands-70924.herokuapp.com/api/v1/orders' 
  React.useEffect(() => {
    
    axios.get(baseURL).then(response => {
      console.log(response.data)
      setValues({order_list: response.data.data})
      console.log("values.order_list2")

    })
  }, []);

  const handleShip = (status,id) => event => {

    event.preventDefault();
    const params = {
      order_status: "Shipped"
    }
    axios.patch(baseURL + "/"+id, params)
      .then(response => {
        console.log(response)
      })
  }
  const handleDeliver = (status,id) => event => {

    event.preventDefault();
    const params = {
      order_status: "Delivered"
    }
    axios.patch(baseURL + "/"+id, params)
      .then(response => {
        console.log(response)
      })
  }
  const monthlyRep = ()=> {
    setValues({month_rep:true});
  }; 
return(
    <React.Fragment>
    <Title>My Orders</Title>
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
          .filter(status => (status.order_status == "Processing" || status.order_status == "Shipped"))
          .filter(({product_id}) =>mycart2.some(exclude => exclude.id === product_id))
            .map(row => (
              <TableRow>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.total_amount} PKR</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.order_status}</TableCell>
                <TableCell>{row.delivered_at}</TableCell>
                <TableCell>{row.product_id}</TableCell>
                {row.order_status == "Processing" ?<TableCell><Button onClick = {handleShip(row.order_status,row.id)}>Ship</Button></TableCell>:
              <TableCell><Button onClick = {handleDeliver(row.order_status,row.id)}>Delivered</Button></TableCell>}
              </TableRow>
          ) ) }
      </TableBody>
    </Table>
  </React.Fragment>
  );
}