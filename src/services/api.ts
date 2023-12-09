import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const URL_BASE = "http://127.0.0.1:3000";

export interface Pokemon {
  base_experience: number;
  height: number;
  id: number;
  name: string;
  img: string;
  status: {
    attack: number;
    defense: number;
    hp: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  abilities: [''];
  weight: number;
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: string;
  sprites: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: number;
  abilities: number;
}

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post(`${URL_BASE}/signUp`, {
      email: email,
      password: password,
      name: name,
    });
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

export const auth = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${URL_BASE}/auth`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

export const getPokemons = async (
  limit: number = 50,
  offset: number = 0
): Promise<any> => {
  try {
    const url = `${URL_BASE}/pokemons/get/${limit}/${offset}`;
    const response = await axios.get(url);
    return response.data.data.pokemon;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
};



export const searchPokemon = async (id: string): Promise<Pokemon> => {
  try {
    const url = `${URL_BASE}/pokemons/search/${id}`;
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
};



export const getPokemonData = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
};

export const getPokemonDetails = async (
  id: number
): Promise<Pokemon> => {
  try {
    const url = `${BASE_URL}/${id}`;
    const response = await axios.get(url);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
};

