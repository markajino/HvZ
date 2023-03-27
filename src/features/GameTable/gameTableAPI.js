import axios from "axios";

export function fetchAllGames(amount = 1) {
  return axios.get("http://localhost:8080/api/v1/games");
}

export function deleteGame(gameId) {
  return axios.delete(`http://localhost:8080/api/v1/games/${gameId}`);
}
