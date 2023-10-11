export const saveGameToStorage = ({ board, turn }) => {
  //guardar aqui partida
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};

export const saveGameWinnersToStorage = (winnersCount) => {
  window.localStorage.setItem("winnersCount", JSON.stringify(winnersCount));
};

export const resetGameCountStorage = () => {
  window.localStorage.removeItem("winnersCount");
};
