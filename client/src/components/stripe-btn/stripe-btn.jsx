import React,{useState} from 'react';

// import StripeCheckout from 'react-stripe-checkout';
// import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import {Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import CustomButton from '../custom-button/custom-button.component';


const stripePromise = loadStripe("pk_test_sBHmQKJP8gGI9Id9J9XsAOD900I2ksR5i2");

const StripeCheckoutButton = ({price=10}) => {
  const [loading, setLoading] =  useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const priceForStripe = price * 100;


   const handleClick = async (event) => {
     setLoading(true)
    const stripe = await stripePromise;
    const response = await fetch("/api/v1/create-checkout-session", {
      method: "POST",
          headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       priceForStripe
      }),
    });
    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result)
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <>
       {
          loading && <Spin  style={{pointerEvents:'none',minWidth: '130px'}} indicator={antIcon} />
        }
        {
          !loading &&  <CustomButton onClick={handleClick}>Donate</CustomButton>

        }
        </>
   
  );
};

export default StripeCheckoutButton;
