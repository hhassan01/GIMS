import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
import MuiAlert from "@material-ui/lab/Alert";

//import AlertTitle from '@material-ui/lab/AlertTitle';
import { AlertTitle } from '@material-ui/lab';
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
    form: {
    width: '105%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function Orders() {
  const classes = useStyles();
    const [values, setValues] = React.useState({
    log_success: false,
    item:'',
    quantity: ''
  });
   const params = {
    item: values.item,
    quantity: values.quantity
  }
  const successful = React.useState()

  const handleSubmitAddItem = event => {
    event.preventDefault();
    axios.post('/api/v1/login', params, {
      headers: {
        'content-type': 'application/json',
      },
    }
    )
    .then(response => {

      console.log(response.data)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('name', response.data.name)

    })
  }; 

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleAddProducts =event => {
    
    const timer = setTimeout(() => setValues({log_success:true}), 5);
    return () => clearTimeout(timer);

  };
  if(values.log_success)
  return (
    <React.Fragment>
    <div className={classes.paper}>
    <form align= "right" >
  <Button style={{visibility: "hidden"}} onClick={handleAddProducts} color="inherit" >Add Products</Button> 
  </form>
<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmitAddItem}>
<div>
  <TextField id="outlined-basic" label="Product Name" variant="outlined"
            name="item"
            value={values.item}
            onChange={handleChange('item')}/>
</div>
<div>
  <TextField id="outlined-basic" label="Quantity" variant="outlined" //quantitymaincontraint
              name="quantity"
            value={values.quantity}
            onChange={handleChange('quantity')}/>
</div>
<div>
<Button type="submit" onClick={() => {
      alert('Item added succesfully!')
    }} variant="contained" color="primary" className={classes.form}> Add</Button>
</div>
</form>
</div>
    </React.Fragment>
  );
  return(

    <React.Fragment>
    <form align= "right">
  <Button onClick={handleAddProducts} color="inherit" >Add Products</Button> 
  </form>
      <Title>Products</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}