import React from 'react';
import './nav.styles.scss';
import { MailOutlined } from '@ant-design/icons';
import MenuItemSkeleton from './menuItem.skeleton';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import {
  selectCurrentUser,
  selectShowBtnSkeleton,
} from '../../redux/user/user.selector';
import { signOutStart } from '../../redux/user/user.action';
import ShowConfirm from '../modal/modal.component';
import { clearStorage } from './nav.util';
class AuthBtn extends React.PureComponent {
  homeClick = () => {
    clearStorage();
    this.props.history.push('/');
  };
  signOut = () => {
    this.props.signOutStart();
    this.homeClick();
  };
  handleSignOut = () => {
    const { pathname } = this.props.location;
    const title = 'Are you sure?';
    let content = null;
    if (pathname === '/upload' || pathname === '/preview') {
      content =
        "You'll be redirect to home page and the upload form will be cleared.";
    }
    ShowConfirm(title, this.signOut, content);
  };
  render() {
    const { currentUser, showSignIn, showBtnSkeleton } = this.props;
    return (
      <>
        {showBtnSkeleton && showSignIn ? (
          <MenuItemSkeleton />
        ) : showSignIn ? (
          <>
            <MailOutlined />
            {currentUser ? (
              <span onClick={this.handleSignOut}>Sign out</span>
            ) : (
              <Link to='/signin'>Sign In</Link>
            )}
          </>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  showBtnSkeleton: selectShowBtnSkeleton(state),
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthBtn),
);
