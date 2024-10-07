import React, { useState } from 'react';
import './game2.css'; // Updated CSS file name

const Dicegame2 = () => {
  const [diceValue1, setDiceValue1] = useState(0);
  const [diceValue2, setDiceValue2] = useState(0);
  const [isRolling1, setIsRolling1] = useState(false);
  const [isRolling2, setIsRolling2] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerScores, setPlayerScores] = useState({ player1: 0, player2: 0 });

  const rollDice = (player) => {
    if (player === 1 && !isRolling1) {
      setIsRolling1(true);
      setTimeout(() => {
        const randomValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue1(randomValue);
        setPlayerScores((prevScores) => ({
          ...prevScores,
          player1: prevScores.player1 + randomValue,
        }));
        setIsRolling1(false);
        setCurrentPlayer(2);
      }, 1000); // Rolling animation for 1 second
    } else if (player === 2 && !isRolling2) {
      setIsRolling2(true);
      setTimeout(() => {
        const randomValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue2(randomValue);
        setPlayerScores((prevScores) => ({
          ...prevScores,
          player2: prevScores.player2 + randomValue,
        }));
        setIsRolling2(false);
        setCurrentPlayer(1);
      }, 1000); // Rolling animation for 1 second
    }
  };

  return (
    <div className="dice-game">
      <h1 style={{ color: "cadetblue" }}>Two Player Dice Game</h1>
      
      <div className="dice-container">
        <div className={`dice ${isRolling1 ? 'rolling' : ''}`}>
          {diceValue1 === 0 ? 'Play' : diceValue1}
        </div>
        <div className={`dice ${isRolling2 ? 'rolling' : ''}`}>
          {diceValue2 === 0 ? 'Play' : diceValue2}
        </div>
      </div>

      <div className="score-container">
        <div className="score">
          Player 1 Score: {playerScores.player1}
        </div>
        <div className="score">
          Player 2 Score: {playerScores.player2}
        </div>
      </div>

      <div className="button-container">
        <button 
          className={`roll-button ${currentPlayer === 1 ? '' : 'disabled'}`} 
          onClick={() => rollDice(1)}
          disabled={currentPlayer !== 1 || isRolling1}
        >
          Player 1 Roll
        </button>
        <button 
          className={`roll-button ${currentPlayer === 2 ? '' : 'disabled'}`} 
          onClick={() => rollDice(2)}
          disabled={currentPlayer !== 2 || isRolling2}
        >
          Player 2 Roll
        </button>
      </div>

      <div className="turn-info">Current Turn: Player {currentPlayer}</div>
    </div>
  );
};

export default Dicegame2;
