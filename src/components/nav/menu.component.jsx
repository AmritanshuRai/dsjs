import React from 'react';
import { Menu } from 'antd';
import './nav.styles.scss';
import {
  MailOutlined,
  UploadOutlined,
  HomeOutlined,
  CoffeeOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { selectCurrentNav } from '../../redux/nav/nav.selector';
import { setCurrentNav, setDrawerVisible } from '../../redux/nav/nav.action';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStart } from '../../redux/user/user.action';

class Navmenu extends React.Component {
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

  render() {
    const {
      navStyle,
      currentNav,
      itemStyle,
      currentUser,
      showSignIn,
      signOutStart,
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
        <Menu.Item style={itemStyle} key='upload'>
          <UploadOutlined />
          <Link to='/upload'>Upload</Link>
        </Menu.Item>
        <Menu.Item style={itemStyle} key='alipay'>
          <CoffeeOutlined />
          <Link to='/donate'>Donate</Link>
        </Menu.Item>
        {showSignIn ? (
          <Menu.Item style={itemStyle} key='mail' className='nav-sign'>
            <MailOutlined />
            {currentUser ? (
              <span onClick={signOutStart}>Sign out</span>
            ) : (
              <Link to='/signin'>Sign In</Link>
            )}
          </Menu.Item>
        ) : null}
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  currentNav: selectCurrentNav(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentNav: (data) => dispatch(setCurrentNav(data)),
  setDrawerVisible: (data) => dispatch(setDrawerVisible(data)),
  signOutStart: () => dispatch(signOutStart()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navmenu),
);
