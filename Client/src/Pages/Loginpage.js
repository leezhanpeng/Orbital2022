import React, { useState, useEffect } from 'react';

import AlreadyLoggedIn from '../Pages/AlreadyLoggedIn.js';
import LoginpageContent from '../Components/LoginpageContent.js';
import CheckAuth from '../Pages/CheckAuth.js';

const Loginpage = () => {

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
        <AlreadyLoggedIn />
      </div>     
    )
  }

  else {
    return (
      <LoginpageContent />
    )
  }
}

export default Loginpage