import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

// import { CloseCircleOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
import './canceled.styles.scss';
const Canceled = () => {
  return (
  <Result
    status="error"
    title="Payment Failed"
    // subTitle="Please check and modify the following information before resubmitting."
    extra={[
      <Link to='/'>
        <Button type="primary" key="console">
        Home
      </Button>
      </Link>
 ,
    ]}
  >
  </Result>
  );
};

export default Canceled;
