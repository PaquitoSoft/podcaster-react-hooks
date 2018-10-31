import React from 'react';
import { Link } from 'react-router-dom';

const PodcastTableRow = ({ podcast, episode }) => (
    <tr className="podcast-episode-summary">
        <td>
            <Link to={`/podcast/${podcast.id}/episode/${episode.id}`}>{episode.title}</Link>
        </td>
        <td>{episode.date}</td>
        <td className="duration">{episode.duration}</td>
    </tr>
);

export default PodcastTableRow;
