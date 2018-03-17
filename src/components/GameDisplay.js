import React, { Component } from 'react'
import { Square } from './Square'
import { calculateWinner, checkBoardIsFull } from '../actions/actions'
import '../index.css'

export default class GameDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // Set all initial square values to null
      xIsNext: true,
      // Keep track of the players turns
      xTotalWins: 0,
      oTotalWins: 0,
      drawnGames: 0
    };
  }
  renderSquareComponent(index) {
    return (
      <Square
        value={ this.state.squares[index] }
        onClick={ () => this.handleSquareClick(index) }
      />
    )
  }
  handleSquareClick(index) {
    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || checkBoardIsFull(squares)) {
      alert('Game over man, game over!')
      return
    } else if (squares[index]) {
      alert('This square has already been taken...')
      return
    }
    squares[index] = this.state.xIsNext ? 'X' : 'O'
    // Select correct value to place in the clicked square
    this.setState(prevState => ({
      squares: squares,
      // Replace previous squares array with new squares array
      xIsNext: !prevState.xIsNext
      // Alternate the player turn
    }))
  }
  resetGameAndUpdateTally = (result) => {
    // Add result to scoreboard and reset game
    if (result === 'X') {
      this.setState(prevState => ({
        squares: Array(9).fill(null),
        xIsNext: true,
        xTotalWins: prevState.xTotalWins + 1,
        oTotalWins: prevState.oTotalWins,
        drawnGames: prevState.drawnGames
      }))
    } else if (result === 'O') {
      this.setState(prevState => ({
        squares: Array(9).fill(null),
        xIsNext: true,
        xTotalWins: prevState.xTotalWins,
        oTotalWins: prevState.oTotalWins + 1,
        drawnGames: prevState.drawnGames
      }))
    } else if (result === 'draw') {
      this.setState(prevState => ({
        squares: Array(9).fill(null),
        xIsNext: true,
        xTotalWins: prevState.xTotalWins,
        oTotalWins: prevState.oTotalWins,
        drawnGames: prevState.drawnGames + 1
      }))
    } else {
      // If game is unfinished, scores stay the same but game resets
      this.setState(prevState => ({
        squares: Array(9).fill(null),
        xIsNext: true,
        xTotalWins: prevState.xTotalWins,
        oTotalWins: prevState.oTotalWins,
        drawnGames: prevState.drawnGames
      }))
    }
  }
  render() {
    const playerWins = calculateWinner(this.state.squares)
    // Check if a player wins on every render
    const boardIsFull = checkBoardIsFull(this.state.squares)
    // Check if the board is full on every render
    let status
    let result
    if (playerWins) {
      status = playerWins + ' wins!'
      result = playerWins
    } else if (boardIsFull) {
      status = 'Game drawn!'
      result = 'draw'
    } else {
      status = 'Next turn - ' + (this.state.xIsNext ? 'X' : 'O')
    }
    return (
      <div className="game-display">
        <div className="board">
          { this.renderSquareComponent(0) }
          { this.renderSquareComponent(1) }
          { this.renderSquareComponent(2) }
          { this.renderSquareComponent(3) }
          { this.renderSquareComponent(4) }
          { this.renderSquareComponent(5) }
          { this.renderSquareComponent(6) }
          { this.renderSquareComponent(7) }
          { this.renderSquareComponent(8) }
        </div>
        <div className="dashboard">
          <div className="row">
            <h4 className="row-header">
              Status
            </h4>
            <h1>
              { status }
            </h1>
          </div>
          <div className="row">
            <h4 className="row-header">
              Scoreboard
            </h4>
            <h1>
              X wins - {this.state.xTotalWins}
            </h1>
            <h1>
              O wins - {this.state.oTotalWins}
            </h1>
            <h1>
              Drawn - {this.state.drawnGames}
            </h1>
          </div>
          <div className="row">
            <h4 className="row-header">
              Actions
            </h4>
            <button
              onClick={ () => this.resetGameAndUpdateTally(result) }
            >
              Play Again
          </button>
          </div>
        </div>
      </div>
    )
  }
}