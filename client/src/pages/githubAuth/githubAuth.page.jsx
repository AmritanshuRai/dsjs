import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectError } from '../../redux/user/user.selector';
import { githubSignInStart } from '../../redux/user/user.action';

class GithubAuth extends React.Component {
  async componentDidMount() {
    const code = this.props.location.search.split('=')[1];
    this.props.githubSignInStart(code);
  }
  render() {
    return <div></div>;
  }
}
const mapStateToProps = (state) => ({
  error: selectError(state),
});

const mapDispatchToProps = (dispatch) => ({
  githubSignInStart: (data) => dispatch(githubSignInStart(data)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GithubAuth)
);
