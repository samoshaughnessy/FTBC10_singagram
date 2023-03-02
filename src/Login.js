import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  login = () => {
    signInWithEmailAndPassword(
      auth,
      this.state.email,
      this.state.password
    ).then((user) => {
      console.log(user);
    });
  };
  signup = () => {
    createUserWithEmailAndPassword(
      auth,
      this.state.email,
      this.state.password
    ).then((user) => {
      console.log(user);
    });
  };

  render() {
    return (
      <div>
        <label>Email</label>
        <input
          type="text"
          value={this.state.email}
          name="email"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="text"
          value={this.state.password}
          name="password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button onClick={this.signup}>Signup</button>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}
