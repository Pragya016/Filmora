import React, { useState } from 'react';
import Homepage from './components/Homepage';
import { Provider } from 'react-redux';
import movieStore from './store/movie.store';
import { createContext } from 'react';
import Header from './components/Header';
import './App.css'

//TODO note: I know that I must not share the .env file. However, I'll delete this database and create another because I'm sharing the env file.
//TODO I am continuously adding new features in the app, so my github repo will have the latest package.

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
