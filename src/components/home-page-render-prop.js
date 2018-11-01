import React from 'react';
import PodcastSummary from './product-summary';
import { getAllPodcasts } from '../api/podcaster';

import ExternalDataLoader from './external-data-loader';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: ''
        };

        this.onFilterChanged = this.onFilterChanged.bind(this);
    }

    onFilterChanged(event) {
        this.setState({ filter: event.target.value });
    }

    filterPodcasts(originalPodcasts, filter) {
        const regExp = new RegExp(filter, 'i');
        return originalPodcasts.filter(
            podcast => regExp.test(podcast.name + podcast.author)
        );
    }

    render() {
        const { filter } = this.state;
        
        return (
            <ExternalDataLoader loader={getAllPodcasts}>
                {({ isLoading, externalData: originalPodcasts}) => {                    
                    if (isLoading) return null;

                    const filteredPodcasts = this.filterPodcasts(originalPodcasts || [], filter);

                    return (
                        <div className="podcasts-grid">
                            <div className="filter">
                                <span className="badge">{filteredPodcasts.length}</span>
                                <input type="text" name="filter-value" autoFocus
                                    placeholder="Filter podcasts..." onChange={this.onFilterChanged}/>
                            </div>
                            <div className="podcasts-list">
                                {filteredPodcasts.map(podcast => {
                                    return (<PodcastSummary key={podcast.id} podcast={podcast} />);
                                })}
                            </div>
                        </div>
                    );
                }}
            </ExternalDataLoader>
        );
    }
}

export default HomePage;
