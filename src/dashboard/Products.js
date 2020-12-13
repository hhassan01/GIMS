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
import Input from '@material-ui/core/Input';
//import EditModal from '../Modals/editModal'

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
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };
  const [values, setValues] = React.useState({
    item:'',
    quantity: '',
    price: '',
    category: '',
    product_list: [],
    log_success: false,
    product_added: false,
    modal_open: false,
    search: '',

    editPrice: '',
    editQuantity: ''
  });
  React.useEffect(() => {
     axios.get(baseURL)
      .then(response => {
        console.log(response.data.data)
        setValues({product_list: response.data.data});
        //setproducts(response.data);
        //setLoading(false)
      })
      .catch(err => {console.log(err);
        });

  }, [searchTerm]);


  
  const params = {
    name: values.name,
    price: values.price,
    min_amount: values.min_amount,
    category: values.category,
    user_id: localStorage.getItem('user_id')
  }
  
  const successful = React.useState()


  const u_id = localStorage.getItem('user_id')

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    setSearchTerm(event.target.value);
   };


return(
  <React.Fragment>
    <Title>Products</Title>
    <Table size="small">
      <TableHead>
        <TableRow>
        <TableCell>Manufacturer ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Minimum Amount</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>

        
      <TableBody>
        {
          values.product_list && values.product_list  
            .map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.user_id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.min_amount}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
              </TableRow>
              
             
          
          ) ) }
      </TableBody>
    </Table>
  </React.Fragment>
);
}
