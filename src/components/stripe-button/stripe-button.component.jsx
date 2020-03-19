import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_sBHmQKJP8gGI9Id9J9XsAOD900I2ksR5i2';

  const ontoken = token => {
    console.log(token);
    alert('succes it is');
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
