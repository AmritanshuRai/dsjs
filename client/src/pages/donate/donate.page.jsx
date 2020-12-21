import React, {useState} from 'react';

import './donate.styles.scss';
// import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import StripeCheckoutButton from '../../components/stripe-btn/stripe-btn';
import {InputNumber,Result} from 'antd'
import { SmileOutlined } from '@ant-design/icons';




const Donate = () => {
  const [price, setPrice]  = useState(5);
  
  const onChange = (value) => {
    setPrice(value);
  }
  return (
    <div className='donate'>
    <Result
    icon={<SmileOutlined />}
    title="We need your support"
    // extra={<Button type="primary">Donate</Button>}
  />
  <div className="donateContainer">
        <InputNumber  style={{width:"110px"}} size="large" min={1} defaultValue={5} onChange={onChange} />
    <StripeCheckoutButton price={price}  /> 
  </div>

    </div>
  );
};

export default Donate;
