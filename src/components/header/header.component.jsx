import React from "react";
import "./header.styles.scss";
import { connect } from "react-redux";
import { handleSearchChange } from "../../redux/question/question.action";
import { auth } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";

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
            {currentUser ? (
                <div onClick={() => auth.signOut()}>Sign out</div>
            ) : (
                <Link to="/signin">Sign In</Link>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    showSearchField: state.question.showSearchField,
    filteredText: state.question.filteredText
});

const mapDispatchToProps = dispatch => ({
    handleSearchChange: e => dispatch(handleSearchChange(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
