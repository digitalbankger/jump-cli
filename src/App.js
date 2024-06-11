import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelegramAuth from './TelegramAuth';
import Profile from './Profile';
import Game from './Game';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelegramAuth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
