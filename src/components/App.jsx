import '../styles/App.css';

import React from 'react';
import Board from './Board';

const App = (props) => {
  return (
    <div className="App">
      <div className="Header">Trello</div>

      <Board />
    </div>
  );
}

export default App;
