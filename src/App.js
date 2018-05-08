import React, { Component } from "react";

import { getBigSquareIndices, checkForClashes } from "./utils";
import { board } from './boards';
import logo from "./logo.svg";
import "./App.css";

const initialBoard = board;

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
