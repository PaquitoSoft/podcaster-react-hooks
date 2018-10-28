import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header clearfix">
            <h3 className="text-muted">
                <Link to="/">
                    Podcaster
                </Link>
                <div className={`spinner hidden`}>
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </h3>
        </header>
    );
}

export default Header;
