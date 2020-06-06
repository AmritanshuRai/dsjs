import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { resetPasswordStart } from '../../redux/user/user.action';
import { selectError } from '../../redux/user/user.selector';
import { Result } from 'antd';
// import { Result } from 'antd';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
} from '../../components/sign-in/sign-in.styles';
class VerifyEmail extends React.Component {
  state = {
    password: '',
    confirmPassword: '',
  };
  afterSuccessCallback = () => {
    const {
      history: { push },
    } = this.props;
    push('/');
  };
  handleSubmit = async (event) => {
    const { password, confirmPassword } = this.state;
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    const { match } = this.props;
    this.props.resetPasswordStart({
      password,
      resetToken: match.params.id,
      afterSuccessCallback: this.afterSuccessCallback,
    });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const showError = typeof this.props.error === 'string' && this.props.error;
    return showError ? (
      <Result status='warning' title={this.props.error} />
    ) : (
      <SignInContainer>
        <SignInTitle>Reset password</SignInTitle>
        <span>Enter your new password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <ButtonsBarContainer>
            <CustomButton type='submit'> Submit </CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  error: selectError(state),
});
const mapDispatchToProps = (dispatch) => ({
  resetPasswordStart: (data) => dispatch(resetPasswordStart(data)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
);
