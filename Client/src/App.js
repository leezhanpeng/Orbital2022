import {
  Route,
  Routes
} from 'react-router-dom';
import Navbar from './Components/Navbar.js';
import Footer from './Components/Footer.js';

import Homepage from './Pages/Homepage.js';
import Profile from "./Pages/Profile.js";
import Games from "./Pages/Games.js"

function App() {
  return (
    <div>      
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/games" element={<Games />} />
    </Routes>
    <Footer />
  </div>

  );
}

export default App;