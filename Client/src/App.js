import {
  Route,
  Routes
} from 'react-router-dom';

import Homepage from './Pages/Homepage.js';

import Profile from "./Pages/ProfilePage.js";
import ChangeDPForm from "./Pages/ChangeDisplayPic.js";
import ChangeBiosForm from "./Pages/ChangeBiography.js";


import Games from "./Pages/Games.js";

import AddNews from "./Pages/AddNews.js";
import Newsletter from "./Pages/Newsletter.js";

import Login from "./Pages/Loginpage.js";
import LoginError from "./Pages/LoginWrongCred.js";
import Signup from "./Pages/Signuppage.js";
import DuplicateUsername from "./Pages/SignupDupUsername.js";
import CreateAccSuccess from "./Pages/CreateAccSuccess.js"
import Logout from "./Pages/LoggedOut"

import Tetris from "./Games/Tetris.js";
import Typing from "./Games/Typing.js";
import Snake from "./Games/Snake.js";

import Friendslist from "./Pages/Friends.js";
import AddFriend from './Pages/AddFriend.js';
import AddedFriend from './Pages/SentFriendReq.js';
import AlreadyAddedFriend from './Pages/AlreadyAddedFriend.js';
import AddFriendError from './Pages/FriendNotReg.js';
import AlreadyFriends from './Pages/AlreadyFriends.js';
import AddSelf from './Pages/AddSelf.js';

import PageNotFound from './Pages/PageNotFound.js';

import Development from './Pages/UnderProduction.js'

function App() {
  return (
    <div>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/loginerror" element={<LoginError />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupsuccessful" element={<CreateAccSuccess />} />
          <Route path="/signupdupuser" element={<DuplicateUsername />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/home" element={<Homepage />} />

          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/changedisplaypic" element={<ChangeDPForm />} />
          <Route path="/changebiography" element={<ChangeBiosForm />} />

          <Route path="/games" element={<Games />} />

          <Route path="/add-news" element={<AddNews />} />
          <Route path="/newsletter/:title" element={<Newsletter />} />

          <Route path="/games/tetris" element={<Tetris />} />
          <Route path="/games/typingspeeddemon" element={<Typing />} />
          <Route path="/games/snakebattle" element={<Snake />} />

          <Route path="/friendslist" element={<Friendslist />} />
          <Route path="/addfriend" element={<AddFriend />} />
          <Route path="/addedfriend" element={<AddedFriend />} />
          <Route path="/alreadyaddedfriend" element={<AlreadyAddedFriend />} />
          <Route path="/addfrienderror" element={<AddFriendError />} />
          <Route path="/alreadyfriends" element={<AlreadyFriends />} />
          <Route path="/addedself" element={<AddSelf />} />


          
          <Route path="/forums" element={<Development />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </div>

);
  
}

export default App;