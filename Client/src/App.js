import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Navbar from './Components/Navbar.js';
import Footer from './Components/Footer.js';

import Homepage from './Pages/Homepage.js';
import Profile from "./Pages/Profile.js";
import Games from "./Pages/Games.js"

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Route exact path="/games">
          <Games />
        </Route>

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;