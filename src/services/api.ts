import axios from 'axios';
import { storageUserGet } from '../storage/storageUser';
import { User } from '../types/User';

const URL_POKE_API_WEB = 'https://pokeapi.co/api/v2';
const URL_BASE_API = "http://127.0.0.1:3000";

const user: User = storageUserGet() || {
  token: "",
  email: "",
  id: "",
  name: "",
  created_at: "",
};

const authToken: string = user.token;
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

export interface PokemonEvolution {
  species: {
    name: string;
  };
  evolves_to: PokemonEvolution[];
}

export interface EvolutionChainResponse {
  chain: PokemonEvolution;
}

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post(`${URL_BASE_API}/signUp`, {
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
    const response = await axios.post(`${URL_BASE_API}/auth`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};


export const createTeam = async (name: string) => {
  try {
    const response = await axios.post(`${URL_BASE_API}/teams/create`, {
      name: name,
    },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

export const addPokeTeam = async (name: string, id: string) => {
  try {
    const response = await axios.post(`${URL_BASE_API}/teams/add-pokemon`, {
      name: name,
      url: id,
    },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
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
): Promise<Pokemon[]> => {
  try {
    const url = `${URL_BASE_API}/pokemons/get/${limit}/${offset}`;
    const response = await axios.get(url);
    return response.data.data.pokemon;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
};

export const searchPokemon = async (id: string): Promise<Pokemon> => {
  try {
    const url = `${URL_BASE_API}/pokemons/search/${id}`;
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
};

export const getPokemonEvolutionChain = async (pokemonId: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${URL_POKE_API_WEB}/pokemon-species/${pokemonId}/`);
    const evolutionChainUrl = response.data.evolution_chain.url;
    const evolutionChainResponse = await axios.get<EvolutionChainResponse>(evolutionChainUrl);

    const listEvolutionNames = (chain: PokemonEvolution): string[] => {
      const evolutionNames: string[] = [];

      const traverseChain = (evolution: PokemonEvolution) => {
        evolutionNames.push(evolution.species.name);

        if (evolution.evolves_to && evolution.evolves_to.length > 0) {
          evolution.evolves_to.forEach(traverseChain);
        }
      };

      traverseChain(chain);

      return evolutionNames;
    };

    const evolutionNames = listEvolutionNames(evolutionChainResponse.data.chain);

    return evolutionNames;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
};

