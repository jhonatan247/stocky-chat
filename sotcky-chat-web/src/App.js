import React from 'react';

import { Router } from '@reach/router';
import { Home } from './Screens/Home/Home';
import { Login } from './Screens/Login/Login';
import { SignUp } from './Screens/SignUp/SignUp';

function App() {
  return (
    <Router>
      <Home path='/' />
      <Login path='login' />
      <SignUp path='signup' />
    </Router>
  );
}

export default App;
