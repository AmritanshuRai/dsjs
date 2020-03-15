import React from "react";
import "./header.styles.scss";
import { connect } from "react-redux";
import { handleSearchChange } from "../../redux/question/question.action";
import { auth } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";
import {
    selectShowSearchField,
    selectFilteredText
} from "../../redux/question/question.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";

// import Search from "../search/search.component";s
const Header = ({
    showSearchField,
    filteredText,
    handleSearchChange,
    currentUser
}) => {
    return (
        <div className="header">
            <div>Home</div>
            {showSearchField ? (
                <div>
                    <input
                        type="search"
                        value={filteredText}
                        onChange={handleSearchChange}
                    />
                </div>
            ) : null}

            <div>About me</div>
            {/* <Search /> */}
            {currentUser ? (
                <div onClick={() => auth.signOut()}>Sign out</div>
            ) : (
                <Link to="/signin">Sign In</Link>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    showSearchField: selectShowSearchField(state),
    filteredText: selectFilteredText(state),
    currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
    handleSearchChange: e => dispatch(handleSearchChange(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
