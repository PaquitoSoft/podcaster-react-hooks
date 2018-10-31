import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/header';
import LoaderContext from './contexts/loader-context';

import './App.css';

const HomePage = lazy(() => import('./components/home-page'));
const PodcastPage = lazy(() => import('./components/podcast-page'));
const EpisodePage = lazy(() => import('./components/episode-page'));

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
						<Suspense fallback={<div></div>}>
							<Switch>
								<Route path="/" exact render={props => <HomePage {...props} />} />
								<Route path="/podcast/:podcastId/episode/:episodeId" render={props => <EpisodePage {...props} />} />
								<Route path="/podcast/:podcastId" render={props => <PodcastPage {...props} />} />
							</Switch>
						</Suspense>
					</main>
				</div>
			</LoaderContext.Provider>
		</BrowserRouter>				
	);
}

export default App;
