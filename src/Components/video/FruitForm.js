import React from "react";
import { push, ref, set } from "firebase/database";
import { realTimeDatabase } from "../firebase";

const REALTIME_DATABASE_KEY = "fruits";

export default class FruitForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
    };
  }

  writeData = () => {
    const fruitListRef = ref(realTimeDatabase, REALTIME_DATABASE_KEY);
    const newFruitRef = push(fruitListRef);

    set(newFruitRef, {
      name: this.state.name,
      descrpition: this.state.description,
      date: new Date().toLocaleString(),
    });
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={this.state.name}
          placeholder="Insert Fruit Name here"
          onChange={(e) => this.handleChange(e)}
        />
        <br />
        <label>Description</label>
        <input
          name="decription"
          type="text"
          value={this.state.description}
          placeholder="Insert Fruit Description here"
          onChange={(e) => this.handleChange(e)}
        />
        <br />

        <button onClick={this.writeData}>Submit Data</button>
      </div>
    );
  }
}
