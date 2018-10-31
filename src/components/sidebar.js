import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ podcast }) => (
    <div className="section sidebar">
        <div className="podcast-cover text-center">
            <Link to={`/podcast/${podcast.id}`}>
                <img src={podcast.cover} alt={podcast.name} />
            </Link>
        </div>
        <hr/>
        <div className="podcast-title">
            <a href={`/podcast/${podcast.id}`}>
                <div className="title">{podcast.name}</div>
                <div className="author"><span>by&nbsp;</span>{podcast.author}</div>
            </a>
        </div>
        <hr/>
        <div className="podcast-description">
            <div>Description:</div>
            <p>{podcast.description}</p>
        </div>
    </div>
);

export default Sidebar;
