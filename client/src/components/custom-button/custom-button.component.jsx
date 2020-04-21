import React from 'react';

import './custom-buttom.styles.scss';

const CustomButton = ({
  children,
  isGoogleSignIn,
  inactive,
  ...otherProps
}) => (
  <button
    className={`${isGoogleSignIn ? 'google-sign-in' : ''} ${
      inactive ? 'btnDisabled' : ''
    }  custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
