import React from 'react';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_sBHmQKJP8gGI9Id9J9XsAOD900I2ksR5i2';
  debugger;
  const ontoken = (token) => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert('success');
      })
      .catch((error) => {
        console.log('payment error ', error);
        alert('some issue with the payment');
      });
  };
  return (
    <StripeCheckout
      label='Pay Now'
      name='DS with JS'
      billingAddress
      shippingAddress
      description={`your are donating ${price}`}
      amount={priceForStripe}
      panelLabel='pay now'
      token={ontoken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
