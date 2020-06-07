import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { selectRenderSignIn } from '../../redux/universal/universal.selector';
import { toggleRenderSignIn } from '../../redux/universal/universal.action';

import { forgotPasswordStart } from '../../redux/user/user.action';

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
  ForgotPasswordContainer,
} from './sign-in.styles';

const ForgotPassword = ({ toggleRenderSignIn, forgotPasswordStart }) => {
  const [userEmail, setEmail] = useState({
    email: '',
  });

  const { email } = userEmail;

  const handleSubmit = async (event) => {
    event.preventDefault();
    forgotPasswordStart(email);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEmail({ ...userEmail, [name]: value });
  };

  return (
    <SignInContainer>
      <SignInTitle>Forgot Password</SignInTitle>
      <span>Verification link will be sent to your email address</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='email'
          required
        />
        <ButtonsBarContainer>
          <CustomButton type='submit'> Send email </CustomButton>
        </ButtonsBarContainer>
      </form>
      <ForgotPasswordContainer onClick={toggleRenderSignIn}>
        Back to Sign In
      </ForgotPasswordContainer>
    </SignInContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleRenderSignIn: () => dispatch(toggleRenderSignIn()),
  forgotPasswordStart: (email) => dispatch(forgotPasswordStart({ email })),
});

const mapStateToProps = (state) => ({
  renderSignIn: selectRenderSignIn(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
