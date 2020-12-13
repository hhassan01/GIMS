import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
      <div>
        <Typography variant="h7" gutterBottom>
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label="Cash on Delivery "
          labelPlacement="end"
        />
        </Typography>
        </div>
      </Grid>
    </React.Fragment>
  );
}
