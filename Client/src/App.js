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

import Login from "./Pages/Loginpage.js";
import Signup from "./Pages/Signuppage.js";
import CreateAccSuccess from "./Pages/CreateAccSuccess.js"

import Tetris from "./Games/Tetris.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupsuccessful" element={<CreateAccSuccess />} />
        <Route path="/home" element={<><Navbar /><Homepage /><Footer /></>} />
        <Route path="/profile" element={<><Navbar /><Profile /><Footer /></>} />
        <Route path="/games" element={<><Navbar /><Games /><Footer /></>} />

        <Route path="/add-news" element={<><Navbar /><AddNews /><Footer /></>} />

        <Route path="/games/tetris" element={<><Navbar /><Tetris /><Footer /></>} />
      </Routes>
    </div>

  );
}

export default App;