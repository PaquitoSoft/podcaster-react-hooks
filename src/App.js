import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import HomePage from './components/home-page';

import './App.css';

function App() {
	
	return (
		<BrowserRouter>
			<div>
				<Header />
				<main className="main-content">
					<Route path="/" exact component={HomePage} />
				</main>
			</div>
		</BrowserRouter>				
	);
}

export default App;
