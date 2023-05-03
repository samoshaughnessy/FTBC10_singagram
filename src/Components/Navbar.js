import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { UserContext } from "../App";

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setIsLoggedIn(true);
        setEmail(user.email);
      } else {
        console.log("user not logged in");
      }
    });
  });

  return (
    <div className="App-header">
      <p>{theme.name}</p>
      <p>{theme.favFood}</p>
      <h2>Second update using netlify</h2>
      <h2>third update using netlify</h2>

      {isLoggedIn ? email : "Not logged in yet"}

      <Link to="/">Landing</Link>
      {isLoggedIn ? null : <Link to="/login">Login</Link>}

      {isLoggedIn ? (
        <div>
          <Link to="/form">Form</Link>
          <button
            onClick={() => {
              signOut(auth).then(() => {
                setIsLoggedIn(false);
                setEmail("");
                navigate("/login");
              });
            }}
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
