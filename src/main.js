import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

document.addEventListener('DOMContentLoaded', () => {
	const appContainer = document.querySelector('.app-container');

	ReactDOM.render(<App />, appContainer);
});
