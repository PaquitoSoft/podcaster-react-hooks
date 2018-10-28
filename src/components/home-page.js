import React from 'react';
import useExternalData from '../hooks/use-external-data';
import { getAllPodcasts } from '../api/podcaster';

import PodcastSummary from './product-summary';

function HomePage() {
    const externalData = useExternalData(getAllPodcasts);
    
    if (externalData.isLoading) return null; // TODO loader indicator

    return (
        <div className="podcasts-grid">
            <div className="filter">
                <span className="badge">{externalData.data.length}</span>
                <input type="text" name="filter-value" autoFocus
                    placeholder="Filter podcasts..." />
            </div>
            <div className="podcasts-list">
                {externalData.data.map(podcast => {
                    return (<PodcastSummary key={podcast.id} podcast={podcast} />);
                })}
            </div>
        </div>
    );
}

export default HomePage;
