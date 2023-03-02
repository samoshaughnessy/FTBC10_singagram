import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { onChildAdded, ref } from "firebase/database";
import { database, auth } from "./firebase";
import Form from "./Form.js";
import Login from "./Login.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const DB_MESSAGES_KEY = "messages";

class App extends React.Component {
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

    onAuthStateChanged(auth, (user) => {
      console.log(user);
      this.setState({ isLoggedIn: true, email: user.email });
    });
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <h2>{this.state.email}</h2>
          {this.state.isLoggedIn ? <Form /> : <Login />}
          {this.state.isLoggedIn ? (
            <button
              onClick={() => {
                signOut(auth).then(() => {
                  this.setState({
                    isLoggedIn: false,
                    email: "",
                  });
                });
              }}
            >
              Logout
            </button>
          ) : null}

          <p>?</p>
          <ol>{messageListItems}</ol>
        </header>
      </div>
    );
  }
}

export default App;
