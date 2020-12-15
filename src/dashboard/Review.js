import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


const address = localStorage.getItem('address')
const zip = localStorage.getItem('zip')
const city = localStorage.getItem('city')
const addresses = [address,zip, city];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const mycart = localStorage.getItem('cart')
  const mycart2 = JSON.parse(mycart)
  const cartTotal = mycart2.reduce((total, { price = 0 }) => total + price, 0);
  const name = localStorage.getItem('name')
  console.log(mycart2);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {mycart2.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.description} />
            <Typography variant="body2">{product.price}PKR</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
           {cartTotal} PKR
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

