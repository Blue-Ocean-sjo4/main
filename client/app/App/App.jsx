import React from 'react';
import Login from '../Login/Login.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import ProfilePage from '../ProfilePage/ProfilePage.jsx';
import NavBar from '../NavBar/NavBar.jsx';

const App = () => {
  return (
    <div>
      <NavBar />
      {/* <Login />
     <div className="temp-separator">
       ------------------------
     </div>
     <SignUp /> */}
      <ProfilePage />
    </div>
  )
}

export default App
