import React from 'react';
import "./header.styles.scss";

const Header = (props) => {
    
    return (
        <div className='header'>
            <div>Home</div>
            <div>
                <input type="search" value={props.filteredText} onChange={props.handleChange}/>
            </div>
            <div>About me</div>
        </div>
    )
}

export default Header;