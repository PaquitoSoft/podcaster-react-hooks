import React from 'react';
import { Link } from 'react-router-dom';

function PodcastSummary({ podcast }) {
    return (
        <div className="podcast-summary">
			<div className="box">
				<Link to={`/podcast/${podcast.id}`}>
					<div className="box-icon">
						<img src={podcast.cover} alt={podcast.name} />
					</div>
					<div className="info">
						<h4 className="text-center">{podcast.name}</h4>
						<p>
							<span className="text-center">
								<span>Author: </span>
								<span>{podcast.author}</span>
							</span>
						</p>
					</div>
				</Link>
			</div>
		</div>
    );
}

export default PodcastSummary;
