import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const Thanks = () => {
  let history = useHistory();
  return (
    <Result
      status='success'
      title='Thank you!'
      subTitle='It will get approved after review.'
      extra={[
        <Button type='primary' key='Home' onClick={() => history.push('/')}>
          Go Home
        </Button>,
      ]}
    />
  );
};

export default Thanks;
