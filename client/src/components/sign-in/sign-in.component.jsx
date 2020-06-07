import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { selectRenderSignIn } from '../../redux/universal/universal.selector';
import { toggleRenderSignIn } from '../../redux/universal/universal.action';
import ForgotPassword from './forgot-password.component';
import { GoogleLogin } from 'react-google-login';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.action';

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
  ForgotPasswordContainer,
} from './sign-in.styles';

const SignIn = ({
  emailSignInStart,
  googleSignInStart,
  renderSignIn,
  toggleRenderSignIn,
}) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    emailSignInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };
  const responseGoogle = ({ profileObj, tokenId }) => {
    googleSignInStart({ profileObj, tokenId });
  };
  return renderSignIn ? (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='password'
          required
        />
        <ButtonsBarContainer>
          <CustomButton type='submit'> Sign in </CustomButton>
          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <CustomButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                type='button'
                isGoogleSignIn
              >
                Sign in with Google
              </CustomButton>
            )}
          ></GoogleLogin>
        </ButtonsBarContainer>
      </form>
      <ForgotPasswordContainer onClick={toggleRenderSignIn}>
        Forgot password ?
      </ForgotPasswordContainer>
    </SignInContainer>
  ) : (
    <ForgotPassword />
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: (data) => dispatch(googleSignInStart(data)),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
  toggleRenderSignIn: () => dispatch(toggleRenderSignIn()),
});

const mapStateToProps = (state) => ({
  renderSignIn: selectRenderSignIn(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
