import React from 'react';

import useExternalData from '../hooks/use-external-data';
import { getPodcastDetail } from '../api/podcaster';

import Sidebar from './sidebar';
import PodcastTableRow from './podcast-table-row';

function PodcastPage({ match }) {
    const { isLoading, data: podcast } = useExternalData(getPodcastDetail.bind(null, match.params.podcastId));
    if (isLoading) return null;

    return (
        <div className="podcast-detail-page page-with-sidebar">
            <section className="sidebar-section">
                <Sidebar podcast={podcast} />
            </section>
            <section className="content-section">
                <div className="section podcast-episodes-count">
                    <span>
                        Episodes: {podcast.episodes.length}
                    </span>
                </div>
                <div className="section podcast-episodes">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {podcast.episodes.map(episode => (<PodcastTableRow key={episode.id} podcast={podcast} episode={episode} />))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default PodcastPage;
