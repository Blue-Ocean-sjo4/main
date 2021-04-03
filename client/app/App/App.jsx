import React from 'react';
import Login from '../Login/Login.jsx';
import SignUp from '../SignUp/SignUp.jsx';

const App = () => {
  return (
    <div>
     <Login />
     <div className="temp-separator">
       ------------------------
     </div>
     <SignUp />
    </div>
  )
}

export default App
