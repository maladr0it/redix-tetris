import React, { Component } from "react";

import { getBigSquareIndices, checkForClashes } from "./utils";
import logo from "./logo.svg";
import "./App.css";

const initialBoard = [
  1,
  0,
  7,
  2,
  0,
  5,
  9,
  0,
  3,
  4,
  0,
  0,
  0,
  8,
  0,
  0,
  7,
  0,
  0,
  0,
  6,
  0,
  0,
  0,
  0,
  5,
  8,
  5,
  6,
  0,
  0,
  1,
  2,
  0,
  0,
  0,
  7,
  0,
  0,
  0,
  3,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  7,
  9,
  0,
  0,
  6,
  4,
  8,
  1,
  0,
  0,
  0,
  0,
  3,
  0,
  0,
  0,
  7,
  0,
  0,
  2,
  0,
  0,
  0,
  5,
  3,
  0,
  2,
  8,
  0,
  7,
  4,
  0,
  6
];

// add context API
class App extends Component {
  state = {
    board: initialBoard,
    clashingSquares: []
  };
  markSquare = index => {
    const newBoard = this.state.board.slice();
    const clashingSquares = checkForClashes(this.state.board, index, 9);
    if (clashingSquares.length === 0) {
      newBoard[index] = 9;
    }
    this.setState({
      board: newBoard,
      clashingSquares: checkForClashes(this.state.board, index, 9)
    });
  };
  render() {
    const bigSquares = Array.from(Array(9).keys()).map(i => (
      <BigSquare
        key={i}
        handleSquareClick={i => this.markSquare(i)}
        indices={getBigSquareIndices(i)}
        board={this.state.board}
        clashingSquares={this.state.clashingSquares}
      />
    ));
    return <div className="Board">{bigSquares}</div>;
  }
}

export default App;

const BigSquare = ({ indices, board, clashingSquares, handleSquareClick }) => (
  <div className="BigSquare">
    {indices.map(i => (
      <Square
        key={i}
        index={i}
        value={board[i]}
        handleClick={() => handleSquareClick(i)}
        clashing={clashingSquares.includes(i)}
      />
    ))}
  </div>
);

const Square = ({ value, index, clashing, handleClick }) => (
  <div
    className={`Square ${clashing ? "Clashing" : ""}`}
    onClick={() => handleClick()}
  >
    <h3>{value || ""}</h3>
  </div>
);
