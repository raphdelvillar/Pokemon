import axios from "axios"

const BASE_URL = "https://pokeapi.co/api/v2"
const DEFAULT_LIMIT = 30

export function fetchPokemons(offset = 0, limit = DEFAULT_LIMIT) {
  return axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
}

export function fetchOnePokemon(name) {
  return axios.get(`${BASE_URL}/pokemon/${name}`);
}
