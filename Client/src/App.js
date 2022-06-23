import {
  Route,
  Routes
} from 'react-router-dom';

import Homepage from './Pages/Homepage.js';
import Profile from "./Pages/Profile.js";
import Games from "./Pages/Games.js";
import AddNews from "./Pages/AddNews.js";

import Login from "./Pages/Loginpage.js";
import LoginError from "./Pages/LoginWrongCred.js";
import Signup from "./Pages/Signuppage.js";
import CreateAccSuccess from "./Pages/CreateAccSuccess.js"

import Tetris from "./Games/Tetris.js";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/loginerror" element={<LoginError />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupsuccessful" element={<CreateAccSuccess />} />

          <Route path="/home" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/games" element={<Games />} />

          <Route path="/add-news" element={<AddNews />} />

          <Route path="/games/tetris" element={<Tetris />} />
        </Routes>
    </div>

);
  
}

export default App;