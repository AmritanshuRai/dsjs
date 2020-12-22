import React, {useState,useEffect} from 'react';

import './donate.styles.scss';
// import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import StripeCheckoutButton from '../../components/stripe-btn/stripe-btn';
import {InputNumber,Result} from 'antd'
import { SmileOutlined } from '@ant-design/icons';





const Donate = () => {
  const [price, setPrice]  = useState(5);
  const [country, setCountry] = useState('IN');

  const getUserCountry = async () => {
    let res = await fetch('https://extreme-ip-lookup.com/json/');
    res = await  res.json();
    setCountry(res.countryCode);
  }

  const onChange = (value) => {
    setPrice(value);
  }

  useEffect(()=>{
    getUserCountry()
  },[]);

  return (
    <div className='donate'>
    <Result
    icon={<SmileOutlined />}
    title="We need your support"
    // extra={<Button type="primary">Donate</Button>}
  />
  <div className="donateContainer">
    {
      country === 'IN' ? <span>INR</span>  : <span>USD</span> 
    }
     <InputNumber  style={{width:"110px"}} size="large" min={1} defaultValue={5} onChange={onChange} />
    <StripeCheckoutButton price={price} country={country}  /> 
  </div>

    </div>
  );
};

export default Donate;
