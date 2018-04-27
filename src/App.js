import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    const spawnSquares = () => {
      let elementArray = [];
      for (let i = 0; i < 10 * 20; i++) {
        elementArray.push(
          <div className={`Square ${i < 10 ? "Filled" : ""}`}>!</div>
        );
      }
      return elementArray;
    };
    return (
      <div className="App">
        <div className="Board">{spawnSquares()}</div>
      </div>
    );
  }
}

export default App;
