import React, { useState, useEffect } from 'react';

import AlreadyLoggedIn from '../Pages/AlreadyLoggedIn.js';
import LoginpageContent from '../Components/LoginpageContent.js';

const Loginpage = () => {

  const [auth, setAuth] = useState([{"allowaccess": false}]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/authentication');
      const jsonResult = await result.json();
      
      setAuth(jsonResult);
    }

    fetchData();
}, []);

  if (auth[0].allowaccess)
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