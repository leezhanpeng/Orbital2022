import {
  Route,
  Routes
} from 'react-router-dom';
import Navbar from './Components/Navbar.js';
import Footer from './Components/Footer.js';

import Homepage from './Pages/Homepage.js';
import Profile from "./Pages/Profile.js";
import Games from "./Pages/Games.js";
import AddNews from "./Pages/AddNews.js";

import Tetris from "./Games/Tetris.js";

function App() {
  return (
    <div>      
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/games" element={<Games />} />
      <Route path="/add-news" element={<AddNews />} />

      <Route path="/games/tetris" element={<Tetris />} />
    </Routes>
    <Footer />
  </div>

  );
}

export default App;