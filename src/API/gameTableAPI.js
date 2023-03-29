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

export const GetAllSquads = async (gameId) => {
  const getGamesURL = `${URL}/api/v1/games/${gameId}/squads`;
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
