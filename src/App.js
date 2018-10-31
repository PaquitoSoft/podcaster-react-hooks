import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/header';
import HomePage from './components/home-page';
import PodcastPage from './components/podcast-page';
import EpisodePage from './components/episode-page';
import LoaderContext from './contexts/loader-context';

import './App.css';

function App() {
	
	const [loadingData, setLoadingData] = useState({ isLoading: false });

	const providerContext = {
		isLoading: loadingData.isLoading,
		setIsLoading: (isLoading) => {
			setLoadingData({ isLoading });
		}
	}

	return (
		<BrowserRouter>
			<LoaderContext.Provider value={providerContext}>
				<div>
					<Header />
					<main className="main-content">
						<Route path="/" exact component={HomePage} />
						<Route path="/podcast/:podcastId" exact component={PodcastPage} />
						<Route path="/podcast/:podcastId/episode/:episodeId" component={EpisodePage} />
					</main>
				</div>
			</LoaderContext.Provider>
		</BrowserRouter>				
	);
}

export default App;
