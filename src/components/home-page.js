import React, { useState } from 'react';
import useExternalData from '../hooks/use-external-data';
import { getAllPodcasts } from '../api/podcaster';

import PodcastSummary from './product-summary';

function onFilterChangedFactory(originalPodcasts, updater) {
    return (event) => {
        const regExp = new RegExp(event.target.value, 'i');
        updater(
            originalPodcasts.filter(podcast => regExp.test(podcast.name + podcast.author))
        );
    };
}

function HomePage() {
    const { isLoading, data: originalPodcasts } = useExternalData(getAllPodcasts);
    if (isLoading) return null;

    const [filteredPodcasts, setFilteredPodcasts] = useState(originalPodcasts);
    
    return (
        <div className="podcasts-grid">
            <div className="filter">
                <span className="badge">{filteredPodcasts.length}</span>
                <input type="text" name="filter-value" autoFocus
                    placeholder="Filter podcasts..." onChange={onFilterChangedFactory(originalPodcasts, setFilteredPodcasts)} />
            </div>
            <div className="podcasts-list">
                {filteredPodcasts.map(podcast => {
                    return (<PodcastSummary key={podcast.id} podcast={podcast} />);
                })}
            </div>
        </div>
    );
}

export default HomePage;
