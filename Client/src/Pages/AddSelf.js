import React, { useState, useEffect } from 'react';

import Navbar from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';
import NotLoggedIn from '../Pages/NotLoggedIn.js'
import AddedSelf from '../Components/AddedSelf.js'

const AddSelf = () => {
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
            <Navbar />
            <AddedSelf />
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

export default AddSelf