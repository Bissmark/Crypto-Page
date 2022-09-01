import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import CoinSearch from './components/CoinSearch'
import Home from './components/Home'

const routes = (
  <Router>
      <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/coin" element={ <CoinSearch /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Signup /> } />
      </Routes>
  </Router>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  routes
);