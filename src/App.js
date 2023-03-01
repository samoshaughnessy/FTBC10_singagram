import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { onChildAdded, push, ref, set } from "firebase/database";
import { database, storage } from "./firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const DB_MESSAGES_KEY = "messages";
const STORAGE_FILES_KEY = "images/";

class App extends React.Component {
  constructor(props) {
    super(props);
    // Initialise empty messages array in state to keep local state in sync with Firebase
    // When Firebase changes, update local state, which will update local UI
    this.state = {
      messages: [],
      message: "",
      fileInputFile: null,
      fileInputValue: "",
    };
  }

  componentDidMount() {
    const messagesRef = ref(database, DB_MESSAGES_KEY);
    // onChildAdded will return data for every child at the reference and every subsequent new child
    onChildAdded(messagesRef, (data) => {
      // Add the subsequent child to local component state, initialising a new array to trigger re-render
      this.setState((state) => ({
        // Store message key so we can use it as a key in our list items when rendering messages
        messages: [...state.messages, { key: data.key, val: data.val() }],
      }));
    });
  }

  // Note use of array fields syntax to avoid having to manually bind this method to the class
  writeData = (url) => {
    const messageListRef = ref(database, DB_MESSAGES_KEY);
    const newMessageRef = push(messageListRef);
    set(newMessageRef, {
      message: this.state.message,
      date: new Date().toLocaleString(),
      url: url,
    });
  };

  submit = () => {
    const storageRefFull = storageRef(
      storage,
      STORAGE_FILES_KEY + this.state.fileInputFile.name
    );

    uploadBytes(storageRefFull, this.state.fileInputFile).then((snapshot) => {
      console.log(snapshot);
      console.log(this.state);
      getDownloadURL(storageRefFull, this.state.fileInputFile.name).then(
        (url) => {
          console.log("URL", url);

          this.writeData(url);
        }
      );
    });
  };

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
          {/* TODO: Add input field and add text input as messages in Firebase */}
          <input
            type="text"
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
          />
          <input
            type="file"
            value={this.state.fileInputValue}
            onChange={(e) => {
              this.setState({
                fileInputFile: e.target.files[0],
                fileInputValue: e.target.file,
              });
            }}
          />
          <button onClick={this.submit}>Send</button>
          <ol>{messageListItems}</ol>
        </header>
      </div>
    );
  }
}

export default App;
