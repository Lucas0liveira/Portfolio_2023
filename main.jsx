import './base.scss';
import './styles/tokens.css';
import './styles/layouts.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Experience from './Experience/Experience.js';

/* Boot Three.js scene — singleton, attaches to the canvas already in the HTML */
const experience = new Experience(document.querySelector('.canvas'));

/* Fire a custom event once resources are ready so the React layer
   can call portfolioGoto for the initial section if Controls wasn't
   registered yet when the component mounted. */
experience.resources.event.on('ready', () => {
  window.__experienceReady = true;
  window.dispatchEvent(new CustomEvent('experience-ready'));
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
