import React from 'react';
import { Menu } from 'antd';
import './nav.styles.scss';
import {
  MailOutlined,
  UploadOutlined,
  HomeOutlined,
  CoffeeOutlined,
} from '@ant-design/icons';
import MenuItemSkeleton from './menuItem.skeleton';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { selectCurrentNav } from '../../redux/nav/nav.selector';
import { setCurrentNav, setDrawerVisible } from '../../redux/nav/nav.action';
import {
  selectCurrentUser,
  selectShowBtnSkeleton,
} from '../../redux/user/user.selector';
import { signOutStart } from '../../redux/user/user.action';
import FailureMessage from '../message/failureMessage.component';
import ShowConfirm from '../modal/modal.component';
class Navmenu extends React.PureComponent {
  handleClick = (e) => {
    this.props.setCurrentNav(e.key);
    this.props.setDrawerVisible(false);
  };
  homeClick = () => {
    localStorage.removeItem('rawTitleState');
    localStorage.removeItem('rawSolutionState');
    localStorage.removeItem('rawExplanationState');
    localStorage.removeItem('buttonEnabled');
    localStorage.removeItem('finalData');
    localStorage.removeItem('id');

    this.props.history.push('/');
  };
  uploadClick = () => {
    this.props.currentUser
      ? this.props.history.push('/upload')
      : FailureMessage('Please sign in');
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
    const {
      navStyle,
      currentNav,
      itemStyle,
      currentUser,
      showSignIn,

      showBtnSkeleton,
    } = this.props;
    return (
      <Menu
        className={navStyle}
        onClick={this.handleClick}
        selectedKeys={[currentNav]}
        mode={this.props.mode}
      >
        <Menu.Item style={itemStyle} key='home' onClick={this.homeClick}>
          <HomeOutlined />
          Home
        </Menu.Item>
        <Menu.Item style={itemStyle} key='upload' onClick={this.uploadClick}>
          <UploadOutlined />
          Upload
        </Menu.Item>
        <Menu.Item style={itemStyle} key='alipay'>
          <CoffeeOutlined />
          <Link to='/donate'>Donate</Link>
        </Menu.Item>
        <Menu.Item style={itemStyle} key='mail' className='nav-sign'>
          {showBtnSkeleton ? (
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
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  currentNav: selectCurrentNav(state),
  showBtnSkeleton: selectShowBtnSkeleton(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentNav: (data) => dispatch(setCurrentNav(data)),
  setDrawerVisible: (data) => dispatch(setDrawerVisible(data)),
  signOutStart: () => dispatch(signOutStart()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navmenu),
);
