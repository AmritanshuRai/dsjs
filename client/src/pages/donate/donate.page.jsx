import React from 'react';

import './donate.styles.scss';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

const Donate = () => {
  return (
    <div className='donate'>
      <StripeCheckoutButton price={100} />
      <div>Test Data</div>
      <div>4242424242424242 </div>
      <div>Any 3 digits cvv</div>
      <div> Any future date</div>
    </div>
  );
};

export default Donate;
