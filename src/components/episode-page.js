import React from 'react';
import { getPodcastDetail } from '../api/podcaster';
import useExternalData from '../hooks/use-external-data';

import Sidebar from './sidebar';

function loader(podcastId, episodeId) {
    return async () => {
        const podcast = await getPodcastDetail(podcastId);
        return {
            podcast,
            currentEpisode: podcast.episodes.find(episode => episode.id === episodeId)
        };
    };
}

function EpisodePage({ match }) {
    const { podcastId, episodeId } = match.params;
    const { isLoading, data } = useExternalData(loader(podcastId, episodeId));
    
    if (isLoading) return null;

    return (
        <div className="episode-detail-page page-with-sidebar">
            <div className="sidebar-section">
                <Sidebar podcast={data.podcast} />
            </div>
            <div className="content-section">
                <div className="episode-detail section">
                    <div className="title">{data.currentEpisode.title}</div>
                    <div className="subtitle" dangerouslySetInnerHTML={{__html: data.currentEpisode.description}}></div>
                    <hr/>
                    <div className="player">
                        <audio src={data.currentEpisode.mediaUrl} controls></audio>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EpisodePage;
