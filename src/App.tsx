import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Feck from './pages/Feck';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="feck" element={<Feck />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
