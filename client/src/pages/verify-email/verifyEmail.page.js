import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { emailVerificationStart } from '../../redux/user/user.action';
import { selectError } from '../../redux/user/user.selector';
import { Result } from 'antd';
class VerifyEmail extends React.Component {
  componentDidMount() {
    const { emailVerificationStart, match } = this.props;
    emailVerificationStart(match.params.id);
  }

  render() {
    const showError = typeof this.props.error === 'string' && this.props.error;
    return showError ? (
      <Result status='warning' title={this.props.error} />
    ) : null;
  }
}
const mapStateToProps = (state) => ({
  error: selectError(state),
});
const mapDispatchToProps = (dispatch) => ({
  emailVerificationStart: (tokenFromEmail) =>
    dispatch(emailVerificationStart(tokenFromEmail)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
);
