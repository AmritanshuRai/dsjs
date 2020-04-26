import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

function ShowConfirm(title, callBack, content) {
  confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content: content ? content : null,
    onOk() {
      callBack();
    },
    onCancel() {},
  });
}

export default ShowConfirm;
