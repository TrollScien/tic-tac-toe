import { Square } from "./Square"
import { ButtonReset } from './ButtonReset'

export function WinnerModal ({ winner, resetGame }) {

    if (winner === null) return null
    const winnerText = winner === false ? 'Empate' : 'Ganó:'
    
    return (
            <section className="winner">
              <div className="text">
                <h2>{ winnerText }</h2>
                <header className="win">
                  {winnerText === 'Empate' ? <Square>😓</Square> : <Square>{winner}</Square>}
                </header>
                <footer>
                  <ButtonReset resetGame={resetGame} />
                </footer>
              </div>
            </section>
          )
}