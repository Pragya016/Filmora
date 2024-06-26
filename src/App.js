import React, { useState } from 'react';
import Homepage from './components/Homepage';
import { Provider } from 'react-redux';
import movieStore from './store/movie.store';
import { createContext } from 'react';
import Header from './components/Header';
import './App.css'

export const watchlistContext = createContext();

const App = () => {
  const [showWatchlist, setShowWatchlist] = useState(false);

  return (
    <Provider store={movieStore}>
      <watchlistContext.Provider value={{ showWatchlist, setShowWatchlist }}>
        <div id='App'>
          <Header />
          <Homepage />
        </div>
      </watchlistContext.Provider>
    </Provider>
  );
};

export default App;
