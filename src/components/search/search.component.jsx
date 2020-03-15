import React from "react";
import "./search.styles.scss";
class Search extends React.Component {
    render() {
        return (
            <div className="container">
                <input type="text" placeholder="Search..." />
                <div className="search"></div>
            </div>
        );
    }
}

export default Search;
