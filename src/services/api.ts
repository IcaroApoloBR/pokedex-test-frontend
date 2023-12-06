const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

interface PokemonProps {
  id: number;
  name: string;
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


export const searchPokemon = async (pokemon: string): Promise<PokemonProps> => {
  try {
    const url = `${BASE_URL}/${pokemon}`
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error("error: ", error)
    throw error;
  }
}

export const getPokemons = async (limit: number = 50, offset: number = 0): Promise<any> => {
  try {
    const url = `${BASE_URL}?limit=${limit}&offset=${offset}`
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error("error: ", error)
    throw error;
  }
}

export const getPokemonData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error("error: ", error)
    throw error;
  }
}

export const getPokemonDetails = async (id: number): Promise<PokemonProps> => {
  try {
    const url = `${BASE_URL}/${id}`
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error("error: ", error)
    throw error;
  }
}