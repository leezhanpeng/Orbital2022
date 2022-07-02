import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';
import NotLoggedIn from '../Pages/NotLoggedIn.js'
import CheckAuth from '../Pages/CheckAuth.js';
import ProfilepageContent from '../Components/ProfilepageContent.js';

const ProfilePage = () => {
  const [auth, setAuth] = useState([{"allowaccess": "checking"}]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch('/authentication');
        const jsonResult = await result.json();
        
        setAuth(jsonResult);
      }
  
      fetchData();
  }, []);
  
  if (auth[0].allowaccess === "checking")
  {
    return (
      <div>
        <CheckAuth />
      </div> 
    )
  }
  
  else if (auth[0].allowaccess)
  {
    return (
      <div>
        <Navbar />
        <ProfilepageContent />
        <Footer /> 
      </div>     
    )
  }
  
  else {
    return (
      <NotLoggedIn />
    )
  }
}

export default ProfilePage