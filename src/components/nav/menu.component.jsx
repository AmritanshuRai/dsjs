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
import { auth } from '../../firebase/firebase.utils';
import { Link, withRouter } from 'react-router-dom';
import { selectCurrentNav } from '../../redux/nav/nav.selector';
import { setCurrentNav, setDrawerVisible } from '../../redux/nav/nav.action';

class Navmenu extends React.Component {
  handleClick = e => {
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
      signComponentStyle,
      currentUser,
      showSignIn,
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
          <span>Donate</span>
        </Menu.Item>
        {showSignIn ? (
          <Menu.Item
            style={itemStyle}
            key='mail'
            className={signComponentStyle}
          >
            <MailOutlined />
            {currentUser ? (
              <span onClick={() => auth.signOut()}>Sign out</span>
            ) : (
              <Link to='/signin'>Sign In</Link>
            )}
          </Menu.Item>
        ) : null}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  currentNav: selectCurrentNav(state),
});

const mapDispatchToProps = dispatch => ({
  setCurrentNav: data => dispatch(setCurrentNav(data)),
  setDrawerVisible: data => dispatch(setDrawerVisible(data)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navmenu),
);
