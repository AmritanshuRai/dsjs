import React from 'react';
import { Menu, Drawer } from 'antd';
import './nav.styles.scss';
import { BarsOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { handleSearchChange } from '../../redux/question/question.action';

import { withRouter } from 'react-router-dom';
import { selectFilteredText } from '../../redux/question/question.selector';
import { selectShowSearchField } from '../../redux/universal/universal.selector';
import {
  selectCurrentUser,
  selectShowBtnSkeleton,
} from '../../redux/user/user.selector';

import { signOutStart } from '../../redux/user/user.action';
import Navmenu from './menu.component';

import AuthBtn from './authBtn.component';

class Nav extends React.PureComponent {
  state = {
    drawerVisible: false,
  };
  itemStyle = {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
  };
  hideDrawer = () => {
    this.setState({ drawerVisible: false });
  };
  render() {
    return (
      <div>
        <Menu className='nav nav-mobile' mode='horizontal'>
          <Menu.Item style={this.itemStyle} key='side'>
            <BarsOutlined
              style={{ fontSize: '24px' }}
              className='sidenav-baricon'
              onClick={() => this.setState({ drawerVisible: true })}
            />
          </Menu.Item>
          <Menu.Item style={this.itemStyle} key='mailNav' className='nav-sign'>
            <AuthBtn itemStyle={this.itemStyle} showSignIn />
          </Menu.Item>
        </Menu>
        <Drawer
          placement='left'
          closable={false}
          onClose={this.hideDrawer}
          visible={this.state.drawerVisible}
        >
          <Navmenu mode='inline' hideDrawer={this.hideDrawer} />
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
  showBtnSkeleton: selectShowBtnSkeleton(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSearchChange: (e) => dispatch(handleSearchChange(e.target.value)),
  signOutStart: () => dispatch(signOutStart()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
