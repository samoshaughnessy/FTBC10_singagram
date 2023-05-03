import logo from "../logo.svg";
import React from "react";
import { onChildAdded, ref } from "firebase/database";
import {
  database,
  //  auth
} from "../firebase";
import { Outlet } from "react-router-dom"; // Route, Routes

// import { Link } from "react-router-dom";
// import Form from "./Form.js";
// import Login from "./Login.js";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import Navbar from "./Navbar";

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const DB_MESSAGES_KEY = "messages";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    // Initialise empty messages array in state to keep local state in sync with Firebase
    // When Firebase changes, update local state, which will update local UI
    this.state = {
      messages: [],
      isLoggedIn: false,
      email: "",
    };
  }

  componentDidMount() {
    const messagesRef = ref(database, DB_MESSAGES_KEY);
    onChildAdded(messagesRef, (data) => {
      this.setState((state) => ({
        messages: [...state.messages, { key: data.key, val: data.val() }],
      }));
    });

    // onAuthStateChanged(auth, (user) => {
    //   console.log(user);
    //   this.setState({ isLoggedIn: true, email: user.email });
    // });
  }

  render() {
    // Convert messages in state to message JSX elements to render

    let messageListItems = this.state.messages.map((message) => (
      <li key={message.key}>
        {message.val.message} - {message.val.date}
        {message.val.url ? (
          <img src={message.val.url} alt={message.val.url} />
        ) : (
          "No url"
        )}
      </li>
    ));
    return (
      <div className="App">
        <header>
          <p>{this.props.hello}</p>
          <Outlet />

          <img src={logo} className="App-logo" alt="logo" />

          {/* //v1 <Navbar /> */}

          {/* {this.state.isLoggedIn ? <Form /> : <Login />} */}

          <ol>{messageListItems}</ol>
        </header>
      </div>
    );
  }
}

export default Landing;
