import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import './success.styles.scss';
const Success = () => {
  return (
<Result
    status="success"
    title="Thank You :)"
    // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Link to='/'>
        <Button type="primary" key="console">
        Home
      </Button>
      </Link>
 ,
    ]}
    />
  );
};

export default Success;
