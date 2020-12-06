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
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import { AlertTitle } from '@material-ui/lab';
//import EditModal from '../Modals/editModal'

/*const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];*/

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
  const baseURL = 'https://agile-badlands-70924.herokuapp.com/api/v1/products/'
    
  const [values, setValues] = React.useState({
    item:'',
    quantity: '',
    price: '',
    category: '',
    product_list: '',
    log_success: false,
    product_added: false,
    modal_open: false,

    editPrice: '',
    editQuantity: ''
  });

  React.useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        setValues({product_list: response.data.data})
      })
  }, []);
  
  const params = {
    name: values.name,
    price: values.price,
    min_amount: values.min_amount,
    category: values.category,
    user_id: localStorage.getItem('user_id')
  }
  
  const successful = React.useState()

  const handleSubmitAddItem = event => {
    event.preventDefault();
    axios.post('/api/v1/products', params, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => {
        console.log(response.data)
        setValues({
          product_added: true,
        }, () => {setTimeout(() => setValues({
          product_added: false
        }))}, 4000)
        setValues({log_success: true})
    })
  }; 

  const handleRemove = uid => event => {
    event.preventDefault();
    const token = localStorage.getItem('token')
    axios.delete(baseURL + uid,
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

  const u_id = localStorage.getItem('user_id')

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  const handleAddProducts = event => {
    const timer = setTimeout(() => setValues({log_success:true}), 4000);
    return () => clearTimeout(timer);
  };

  const handleEdit = (itemPrice, itemQuantity) => event => {
    const timer = setTimeout(() => setValues({
                                                modal_open:true,
                                                editPrice: itemPrice,
                                                editQuantity: itemQuantity
                                              }), 4000);
    return () => clearTimeout(timer);
  }

  const handleEditProduct = event => {
    event.preventDefault();
    //axios.patch('', params)
  }

  if(values.log_success)
  return (
    <React.Fragment>
      <div className={classes.paper}>
        <Button onClick={handleAddProducts} color="inherit" ></Button> 
        <form 
          className={classes.root} 
          noValidate 
          autoComplete="off" 
          onSubmit={handleSubmitAddItem}
        >
        <Typography component="h1" variant="h5" align='center'>
          Add Product
        </Typography>
        
        <div>
          <TextField 
            id="name" 
            label="Product Name" 
            variant="outlined"
            name="name"
            value={values.name}
            required
            autoFocus
            onChange={handleChange('name')}
          />
        </div>
        
        <div>
          <TextField 
            id="category" 
            label="Category" 
            variant="outlined"
            name="category"
            value={values.category}
            required
            autoFocus
            onChange={handleChange('category')}
          />
        </div>
      <div>
        <TextField 
          id="min_amount" 
          label="Quantity" 
          variant="outlined" 
          name="min_amount"
          value={values.quantity}
          required
          onChange={handleChange('min_amount')}
        />
      </div>
      
      <div>
        <TextField 
          id="price" 
          label="Price" 
          variant="outlined"
          name="price"
          value={values.price}
          required
          autoFocus
          onChange={handleChange('price')}
        />
      </div>
      
      <div>
        <Button 
          type="submit" 
          onClick 
          variant="contained" 
          color="primary" 
          className={classes.form}>Add</Button>
      </div>
    </form>
  </div>
</React.Fragment>
);

if(values.modal_open)
return(
        <React.Fragment>
      <div className={classes.paper}>
        <Button onClick={handleEdit} color="inherit" ></Button> 
        <form 
          className={classes.root} 
          noValidate 
          autoComplete="off" 
          onSubmit={handleEditProduct}
        >
        <Typography component="h1" variant="h5" align='center'>
          Edit Product Details
        </Typography>
        
        <TextField
            autoFocus
            margin="dense"
            id="editPrice"
            label="Price"
            type="number"
            fullWidth
            value={values.editPrice}
            onChange={handleChange('editPrice')}
        />

        <TextField
            autoFocus
            margin="dense"
            id="editQuantity"
            label="Minimum Amount"
            type="number"
            fullWidth
            value={values.editQuantity}
            onChange={handleChange('editQuantity')}
        />
      <div>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          className={classes.form}>Set Values</Button>
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
          <TableCell>Name</TableCell>
          <TableCell>Minimum Amount</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
        
      <TableBody>
        {
          values.product_list && values.product_list
            .filter(prod => prod.user_id == u_id)  
            .map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.min_amount}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell><Button 
                  align= "left" 
                  color="inherit"
                  onClick={handleRemove(row.id)}
                ><span class="material-icons">delete</span></Button></TableCell>
                <TableCell><Button onClick={handleEdit(row.price, row.min_amount)}><span class="material-icons">system_update_alt</span></Button></TableCell>
              </TableRow>
          ) ) }
      </TableBody>
    </Table>
  </React.Fragment>
);
}