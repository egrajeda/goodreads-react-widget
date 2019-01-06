import React from 'react';
import ReactDOM from 'react-dom';
import CurrentlyReading from './CurrentlyReading';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrentlyReading />, div);
  ReactDOM.unmountComponentAtNode(div);
});
