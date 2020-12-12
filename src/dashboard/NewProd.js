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
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
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

const items = [
  {
    id: 1,
    name: "overwatch",
    price: 20,
  },
  {
    id: 2,
    name: "minecraft",
    price: 32,
  },
  {
    id: 3,
    name: "fortnite",
    price: 51,
  },
];




export default function Orders() {


  const [cart, setCart] = React.useState([]);
  const [prod, setProd] = React.useState([]);
  const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);
  const prodTotal = prod.reduce((total, { price = 0 }) => total + price, 0);  
  //{amountOfItems(row.id)} x ${row.price} {`${row.name}`}
  const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const addToCart = (item) => setCart((currentCart) => [...currentCart, item]);

  const removeFromCart = (item) => {
    setCart((currentCart) => {
      const indexOfItemToRemove = currentCart.findIndex((cartItem) => cartItem.id === item.id);

      if (indexOfItemToRemove === -1) {
        return currentCart;
      }

      return [
        ...currentCart.slice(0, indexOfItemToRemove),
        ...currentCart.slice(indexOfItemToRemove + 1),
      ];
    });
  };

  const amountOfItems = (id) => cart.filter((item) => item.id === id).length;

 

  const listItemsInCart = () => items.map((item) => (
    <div key={item.id}>
      ({amountOfItems(item.id)} x ${item.price}) {`${item.name}`}
      <button type="submit" onClick={() => removeFromCart(item)}>Remove</button>
    </div>
  ));

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
    editQuantity: '',
    editID: ''
  });

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleSearchChange = e => {
    e.preventDefault()
    setSearchTerm(e.target.value);
  };

  React.useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        setValues({product_list: response.data.data})
        const results = values.product_list && values.product_list
          .filter(product =>
            product.name.toLowerCase().includes(searchTerm)
          );
        setSearchResults(results)
      })
  }, [searchTerm]);
  
  const params = {
    name: values.name,
    price: values.price,
    min_amount: values.min_amount,
    category: values.category,
    rating: value.rating,
    user_id: localStorage.getItem('user_id')

  }
  
//  const successful = React.useState()

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

  const handleEdit = (itemPrice, itemQuantity, itemID) => event => {
    const timer = setTimeout(() => setValues({
                                                modal_open:true,
                                                editPrice: itemPrice,
                                                editQuantity: itemQuantity,
                                                editID: itemID
                                              }), 4000);
    return () => clearTimeout(timer);
  }

  const handleEditProduct = event => {
    event.preventDefault();
    const params = {
      price: values.editPrice,
      min_amount: values.editQuantity
    }
    axios.patch(baseURL + values.editID, params)
      .then(response => {
        console.log(response)
      })
  }

  if(values.log_success)
  return (
    <React.Fragment>
      <div className={classes.paper}>
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
            
            label="Minimum Amount"
            type="number"
            fullWidth
            id="editQuantity"
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
      <div>Shopping Cart Balance: ${cartTotal} ({cart.length})</div>
      <div>
        <button onClick={() => setCart([])}>Clear</button>
      </div>
   </form>
    <Title>Products</Title>
    <Table size="small">
      <TableHead>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
          {searchResults && searchResults
            .map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.min_amount}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
                
              </TableRow>
            ))}
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
            //.filter(prod => prod.user_id == u_id)
         // searchResults && searchResults  
            .map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.min_amount}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell><Button 
                  align= "left" 
                  color="inherit"

                  onClick={() => addToCart(row)}
                ><span class="material-icons">
                add_shopping_cart
                </span></Button>
                <TableCell>
                  <button 
                    type="submit" 
                    onClick={() => removeFromCart(row)}
                  >Remove</button>
                </TableCell>
                ({amountOfItems(row.id)} x ${row.price}) {`${row.name}`}
              </TableCell>
                <Rating
                  name="hover-feedback"
                  value = {row.rating}
                  precision={0.5}
                  onChange={(value, newHover) => {
                    setValue(newHover);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
              </TableRow>
          ) ) }
      </TableBody>
    </Table>
  </React.Fragment>
);
}