import React from 'react';
import { render } from 'react-dom';

const App = () => {
  return (
    <div>
      <h1>React Working load testing how lovely</h1>
      <h2>Let us see how this looks</h2>
      <p>How about this too? So its working</p>
    </div>
  );
};

render(<App />, document.getElementById('app'));
