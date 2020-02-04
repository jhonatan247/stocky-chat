import React from 'react';

import { Router } from '@reach/router';
import { Home } from './Screens/Home/Home';
import { Login } from './Screens/Login/Login';

function App() {
  return (
    <Router>
      <Home path='/' />
      <Login path='login' />
    </Router>
  );
}

export default App;
