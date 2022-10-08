import React from 'react';
import logo from './logo.svg';
import './index.css'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Boards from './pages/Boards';
import BoardsList from './pages/BoardsList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> */}
            <Route path="/boards" element={<Boards />} />
            <Route path="/boardsList" element={<BoardsList />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
