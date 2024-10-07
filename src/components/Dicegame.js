import React, { useState } from 'react';
import './DiceGame.css';

const DiceGame = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerPositions, setPlayerPositions] = useState({ player1: 0, player2: 0 });
  const [playerScores, setPlayerScores] = useState({ player1: 0, player2: 0 });

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(randomValue);
      movePlayer(randomValue);
      setIsRolling(false);
    }, 1000); // Rolling animation for 1 second
  };

  const movePlayer = (steps) => {
    setPlayerPositions((prevPositions) => {
      const newPositions = { ...prevPositions };
      const playerKey = `player${currentPlayer}`;
      
      // Move the player
      newPositions[playerKey] = prevPositions[playerKey] + steps;

      // Update score
      setPlayerScores((prevScores) => ({
        ...prevScores,
        [playerKey]: prevScores[playerKey] + steps,
      }));

      // Check win condition (assuming a 30-square board)
      if (newPositions[playerKey] >= 30) {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
        return prevPositions;
      }

      // Switch to the next player
      setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));

      return newPositions;
    });
  };

  const resetGame = () => {
    setPlayerPositions({ player1: 0, player2: 0 });
    setPlayerScores({ player1: 0, player2: 0 });
    setCurrentPlayer(1);
  };

  return (
    <div className="dice-game">
      <h1>Two Player Dice Game</h1>
      <div className="board">
        <div className={`player player1`} style={{ top: `${playerPositions.player1 * 20}px` }}>
          <div className="token"></div>
          <div className="score">Score: {playerScores.player1}</div>
          P1
        </div>
        <div className={`player player2`} style={{ top: `${playerPositions.player2 * 20}px` }}>
          <div className="token"></div>
          <div className="score">Score: {playerScores.player2}</div>
          P2
        </div>
      </div>

      <div className="dice-container">
        <div className={`dice dice-${diceValue} ${isRolling ? 'rolling' : ''}`}>{diceValue}</div>
        <div className="button-container">
          <button 
            className={`roll-button ${currentPlayer === 1 ? '' : 'disabled'}`} 
            onClick={currentPlayer === 1 && !isRolling ? rollDice : null}>
            Player 1 Roll
          </button>
          <button 
            className={`roll-button ${currentPlayer === 2 ? '' : 'disabled'}`} 
            onClick={currentPlayer === 2 && !isRolling ? rollDice : null}>
            Player 2 Roll
          </button>
        </div>
      </div>

      <div className="turn-info">Current Turn: Player {currentPlayer}</div>
    </div>
  );
};

export default DiceGame;
