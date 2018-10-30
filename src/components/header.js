import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import LoaderContext from '../contexts/loader-context';

function Header() {
    const { isLoading } = useContext(LoaderContext);
    
    return (
        <header className="header clearfix">
            <h3 className="text-muted">
                <Link to="/">
                    Podcaster
                </Link>
                <div className={`spinner ${isLoading ? '' : 'hidden'}`}>
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </h3>
        </header>
    );
}

export default Header;
