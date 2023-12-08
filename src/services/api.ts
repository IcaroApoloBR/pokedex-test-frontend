import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

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

export const searchPokemon = async (pokemon: string): Promise<Pokemon> => {
  try {
    const url = `${BASE_URL}/${pokemon}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
};

export const getPokemons = async (
  limit: number = 50,
  offset: number = 0
): Promise<any> => {
  try {
    const url = `${BASE_URL}?limit=${limit}&offset=${offset}`;
    const response = await axios.get(url);
    return response.data;
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
