import React from 'react';
import ReactDOM from 'react-dom';
import CurrentlyReading from './CurrentlyReading';

const container = document.getElementById('currently-reading');
ReactDOM.render(
  <CurrentlyReading feed={container.getAttribute('data-feed')}
                    loadingMessage={container.getAttribute('data-loading-message')}/>,
  container);
