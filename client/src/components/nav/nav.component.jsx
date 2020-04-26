import React from 'react';
import { Menu, Drawer } from 'antd';
import './nav.styles.scss';
import { BarsOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { handleSearchChange } from '../../redux/question/question.action';
// import { auth } from '../../firebase/firebase.utils';
import { withRouter } from 'react-router-dom';
import { selectFilteredText } from '../../redux/question/question.selector';
import { selectShowSearchField } from '../../redux/universal/universal.selector';
import {
  selectCurrentUser,
  selectShowBtnSkeleton,
} from '../../redux/user/user.selector';
import { setDrawerVisible } from '../../redux/nav/nav.action';
import { selectDrawerVisible } from '../../redux/nav/nav.selector';
import { signOutStart } from '../../redux/user/user.action';
import Navmenu from './menu.component';

import AuthBtn from './authBtn.component';
class Nav extends React.PureComponent {
  itemStyle = {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
  };

  render() {
    return (
      <div>
        <Menu className='nav nav-mobile' mode='horizontal'>
          <Menu.Item style={this.itemStyle} key='side'>
            <BarsOutlined
              style={{ fontSize: '24px' }}
              className='sidenav-baricon'
              onClick={() => this.props.setDrawerVisible(true)}
            />
          </Menu.Item>
          <Menu.Item style={this.itemStyle} key='mailNav' className='nav-sign'>
            <AuthBtn itemStyle={this.itemStyle} showSignIn />
          </Menu.Item>
        </Menu>
        <Drawer
          placement='left'
          closable={false}
          onClose={() => this.props.setDrawerVisible(false)}
          visible={this.props.drawerVisible}
        >
          <Navmenu mode='inline' />
        </Drawer>

        <Navmenu
          navStyle='nav nav-desktop'
          mode='horizontal'
          itemStyle={this.itemStyle}
          showSignIn
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  showSearchField: selectShowSearchField(state),
  filteredText: selectFilteredText(state),
  currentUser: selectCurrentUser(state),
  drawerVisible: selectDrawerVisible(state),
  showBtnSkeleton: selectShowBtnSkeleton(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSearchChange: (e) => dispatch(handleSearchChange(e.target.value)),
  setDrawerVisible: (data) => dispatch(setDrawerVisible(data)),
  signOutStart: () => dispatch(signOutStart()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
