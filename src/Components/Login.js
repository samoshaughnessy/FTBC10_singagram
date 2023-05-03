import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const login = () => {
    signInWithEmailAndPassword(auth, info.email, info.password).then((user) => {
      console.log(user);
      navigate("/form");
    });
  };
  const signup = () => {
    createUserWithEmailAndPassword(auth, info.email, info.password).then(
      (user) => {
        console.log(user);
        navigate("/");
      }
    );
  };

  // useEffect(() => {
  //   console.log("Always will run");
  // });

  useEffect(() => {
    console.log("This will run when my state of email or password updates");
  }, [info.email, info.password]);

  // useEffect(() => {
  //   return () => {
  //     console.log("This will run when our component unmounts!");
  //   };
  // });

  return (
    <div>
      {/* // v1 <Navbar /> */}
      <label>Email</label>
      <input
        type="text"
        value={info.email}
        name="email"
        onChange={(e) =>
          setInfo({ email: e.target.value, password: info.password })
        }
      />
      <label>Password</label>
      <input
        type="text"
        value={info.password}
        name="password"
        onChange={(e) => setInfo({ ...info, password: e.target.value })}
      />
      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>
    </div>
  );
}
