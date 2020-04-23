import { message } from 'antd';

const SuccessMessage = (msg) => {
  const messageToShow = msg ? msg : 'Login successful';
  message.success(messageToShow);
};

export default SuccessMessage;
