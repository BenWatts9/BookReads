import logo from './logo.svg';
import './App.css';
import { Spinner } from "reactstrap";
import ApplicationViews from "./components/ApplicationViews";
import { BrowserRouter as Router } from "react-router-dom";
import { onLoginStatusChange } from "./modules/authManager";
import { useEffect, useState } from "react"
import { getLoggedInUser } from './modules/userProfileManager';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getLoggedInUser().then((user) => {
        setUser(user);
      });
    }
  }, [isLoggedIn]);


  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />

      <ApplicationViews isLoggedIn={isLoggedIn} user={user} />
    </Router>
  );
}

export default App;
