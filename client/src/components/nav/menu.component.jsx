import React from 'react';
import { Menu } from 'antd';
import './nav.styles.scss';
import {
  UploadOutlined,
  HomeOutlined,
  CoffeeOutlined,
} from '@ant-design/icons';
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
import AuthBtn from './authBtn.component';
import { clearStorage } from './nav.util';

class Navmenu extends React.PureComponent {
  handleClick = (e) => {
    this.props.setCurrentNav(e.key);
    this.props.setDrawerVisible(false);
  };
  homeClick = () => {
    clearStorage();
    this.props.history.push('/');
  };
  uploadClick = () => {
    this.props.currentUser
      ? this.props.history.push('/upload')
      : FailureMessage('Please sign in');
  };

  render() {
    const { navStyle, currentNav, itemStyle, showSignIn } = this.props;
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
        <Menu.Item style={itemStyle} key='mailMenu' className='nav-sign'>
          <AuthBtn itemStyle={itemStyle} showSignIn={showSignIn} />
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
