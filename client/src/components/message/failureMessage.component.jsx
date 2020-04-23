import { message } from 'antd';

const FailureMessage = (msg) => {
  const messageToShow = msg ? msg : 'Some error occured. Please try again';
  message.error(messageToShow);
};

export default FailureMessage;
