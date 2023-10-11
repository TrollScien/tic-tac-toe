import { useState } from "react"
import confetti from "canvas-confetti"
import { GAMES_TO_WIN, TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { Board } from "./components/Board"
import { TurnsSection } from "./components/TurnsSection"
import { ButtonReset } from "./components/ButtonReset"
import { resetGameCountStorage, resetGameStorage, saveGameToStorage, saveGameWinnersToStorage } from "./logic/storage"
import { WinnerCount } from "./components/WinnerCount"

function App () {
  // Estado inicial del contador de partidas ganadas
  const initialWinnersCount = { "❌": 0, "⚪": 0 };

  const [board, setBoard] = useState(() => {
    //si no hay juego empezado, empieza uno desde 0
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    //si había una jugada anterior, sino empieza la X
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winnersCount, setWinnersCount] = useState(() => {
    // Obtener el contador de partidas ganadas del almacenamiento
    const winnersCountFromStorage = window.localStorage.getItem('winnersCount');
    if (winnersCountFromStorage) {
      return JSON.parse(winnersCountFromStorage);
    } else {
      return initialWinnersCount;
    }
  });

  // null si no hay ganador, false empate, true ganador
  const [winner, setWinner] = useState(null)

 
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
    
    if (winnersCount['❌'] >= GAMES_TO_WIN || winnersCount['⚪'] >= GAMES_TO_WIN) {
      setWinnersCount(initialWinnersCount)
      resetGameCountStorage()
    }
  }

  const updateBoard = (index) => {
    //si ya tiene algo no se actualiza
    if(board[index] || winner) return
    
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // guardar la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      setWinner(newWinner)
      // Actualizar el contador de partidas ganadas
      const newWinnersCount = {
        ...winnersCount,
        [newWinner]: winnersCount[newWinner] + 1
      };
      if(newWinnersCount['❌'] >= GAMES_TO_WIN || newWinnersCount['⚪'] >= GAMES_TO_WIN){
        confetti()
      }
      setWinnersCount(newWinnersCount);
      saveGameWinnersToStorage(newWinnersCount);
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }


  }
  
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <ButtonReset resetGame={resetGame}/>
      <Board board={board} updateBoard={updateBoard}/>
      <TurnsSection turn={turn}/>
      <WinnerModal resetGame={resetGame} winner={winner}/>
      <WinnerCount winnersCount={winnersCount}/>
    </main>
  )
}

export default App
