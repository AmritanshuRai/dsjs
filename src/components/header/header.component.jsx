import React from 'react';
import './header.styles.scss';
import { connect } from 'react-redux';
import { handleSearchChange } from '../../redux/question/question.action';
import { auth } from '../../firebase/firebase.utils';
import { Link, withRouter } from 'react-router-dom';
import { selectFilteredText } from '../../redux/question/question.selector';
import { selectShowSearchField } from '../../redux/universal/universal.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';

// import Search from "../search/search.component";s
const Header = ({
  showSearchField,
  filteredText,
  handleSearchChange,
  currentUser,
  location: { pathname },
}) => {
  return (
    pathname === '/404' || (
      <div className='header'>
        <Link to='/'>Home</Link>
        <Link to='/upload'>Upload</Link>
        {showSearchField ? (
          <div>
            <input
              type='search'
              value={filteredText}
              onChange={handleSearchChange}
            />
          </div>
        ) : null}

        <div>About mee</div>
        {/* <Search /> */}
        {currentUser ? (
          <div onClick={() => auth.signOut()}>Sign out</div>
        ) : (
          <Link to='/signin'>Sign In</Link>
        )}
        <Link to='/donate'>Donate</Link>
      </div>
    )
  );
};

const mapStateToProps = state => ({
  showSearchField: selectShowSearchField(state),
  filteredText: selectFilteredText(state),
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
  handleSearchChange: e => dispatch(handleSearchChange(e.target.value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
