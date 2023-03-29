import axios from ".";
import keycloak from "../keycloak";

const { token } = keycloak;

const headers = { Authorization: `Bearer ${token}` };

const URL = "https://hvz-2023.azurewebsites.net";

/**
 * SAMPLE FUNCTION: Fetch products from a REST API
 * @returns { Promise<{ products: [], error: null | string }>} response
 */
export const fetchAllGames = async () => {
  const getGamesURL = `${URL}/api/v1/games`;

  try {
    const { data } = await axios.get(getGamesURL);
    return Promise.resolve({
      data: data,
      error: null,
    });
  } catch (e) {
    return {
      data: [],
      error: e.message,
    };
  }
};

export const deleteGame = async (gameId) => {
  const getGamesURL = `${URL}/api/v1/games/${gameId}`;

  try {
    const { data } = await axios.delete(getGamesURL, { headers });
    return Promise.resolve({
      data: data,
      error: null,
    });
  } catch (e) {
    return {
      data: [],
      error: e.message,
    };
  }
};

//same function but wait for keycloak to be ready
export const getGame = async (gameId) => {
  const getGamesURL = `${URL}/api/v1/games/${gameId}`;

  try {
    const { data } = await axios.get(getGamesURL, { headers });
    return Promise.resolve({
      token: token,
      data: data,
      error: null,
    });
  } catch (e) {
    return {
      data: [],
      error: e.message,
    };
  }
};

export const createGame = async (game) => {
  const getGamesURL = `${URL}/api/v1/games`;

  try {
    const { data } = await axios.post(getGamesURL, game, { headers });
    return Promise.resolve({
      data: data,
      error: null,
    });
  } catch (e) {
    return {
      data: [],
      error: e.message,
    };
  }
};

export const GetAllSquads = async (gameId) => {
  const getGamesURL = `${URL}/api/v1/games/${gameId}/squads`;
  const headers = {
    Authorization: `Bearer ${token}`,
    requestedByPlayerWithId: gameId,
  };
  try {
    const { data } = await axios.get(getGamesURL, { headers });
    return Promise.resolve({
      data: data,
      error: null,
    });
  } catch (e) {
    return {
      data: [],
      error: e.message,
    };
  }
};

export const GetAllPlayers = async (gameId) => {
  const getGamesURL = `${URL}/api/v1/games/${gameId}/players`;
  const headers = {
    Authorization: `Bearer ${token}`,
    requestedByPlayerWithId: 1,
  };
  try {
    const { data } = await axios.get(getGamesURL, { headers });
    return Promise.resolve({
      data: data,
      error: null,
    });
  } catch (e) {
    return {
      data: [],
      error: e.message,
    };
  }
};

export const updateGame = async (gameId, game, state) => {
  const getGamesURL = `${URL}/api/v1/games/${gameId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    state: state,
  };
  try {
    const { data } = await axios.put(getGamesURL, game, { headers });
    return Promise.resolve({
      data: data,
      error: null,
    });
  } catch (e) {
    return {
      data: [],
      error: e.message,
    };
  }
};

export const deletePlayer = async (gameId, playerId) => {
  const getGamesURL = `${URL}/api/v1/games/${gameId}/players/${playerId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const { data } = await axios.delete(getGamesURL, { headers });
    return Promise.resolve({
      data: data,
      error: null,
    });
  } catch (e) {
    return {
      data: [],
      error: e.message,
    };
  }
};

export const updatePlayer = async (gameId, playerId) => {
  const getGamesURL = `${URL}/api/v1/games/${gameId}/players/${playerId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const { data } = await axios.put(getGamesURL, { headers });
    return Promise.resolve({
      data: data,
      error: null,
    });
  } catch (e) {
    return {
      data: [],
      error: e.message,
    };
  }
};

export const createSqaud = async (gameId, squad, playerId) => {
  const getGamesURL = `${URL}/api/v1/games/${gameId}/squads`;
  const headers = {
    Authorization: `Bearer ${token}`,
    player_id: playerId,
  };
  try {
    const { data } = await axios.post(getGamesURL, squad, { headers });
    return Promise.resolve({
      data: data,
      error: null,
    });
  } catch (e) {
    return {
      data: [],
      error: e.message,
    };
  }
};
