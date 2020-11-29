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
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  center: {
    display: flex,
    justify-content: center,
    align-items: center,
    height:'100vh',  
}
}));

export default function Manufacturers() {
  const classes = useStyles();


  const [values, setValues] = React.useState({
    add_success: false
  });
  const addManufacturer = () => {
    setValues({add_success:true})
  };
  
  if (values.add_success)
  return (
    <React.Fragment>
    <form align= "left">
  </form>
  <Button color="inherit"
  onClick={addManufacturer}>Add Manufacturer</Button> 
    <form className={classes.root} noValidate autoComplete="off">
    <div>
    <TextField 
    margin="normal"
    required
    id="outlined-basic"
    label="Name"
    variant="outlined"/>
    </div>
    <div>
    <TextField 
    margin="normal" 
    required 
    id="outlined-basic" 
    label="ID" 
    variant="outlined"  />
    </div>
    <div>
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </div>
    
    </form>
    <Button
            type="submit"
            variant="contained"
            color="primary"
            align = "left"
            className={classes.submit}
          >
            Add
          </Button>  
    </React.Fragment>
  );
return (
  <React.Fragment>
  <form align= "right">
<Button color="inherit" onClick={addManufacturer} >Add Manufacturer</Button> 
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