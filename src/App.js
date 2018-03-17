import React, { Component } from 'react'
import GameDisplay from './components/GameDisplay'
import './index.css'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Tic-Tac-Toe</h1>
        <GameDisplay />
      </div>
    );
  }
}
