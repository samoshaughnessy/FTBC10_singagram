import React from "react";
import { push, ref, set } from "firebase/database";
import { database, storage } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
// import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom"; // only be used in a function
import Input from "./Input";

const DB_MESSAGES_KEY = "messages";
const STORAGE_FILES_KEY = "images/";
export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = { message: "", fileInputFile: null, fileInputValue: "" };
  }

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
    return (
      <div>
        {/* // V1<Navbar /> */}
        <Input value={this.state.message} />
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
      </div>
    );
  }
}
