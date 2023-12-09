import { createContext, useContext, useState, useEffect } from 'react';
import { getPokemons } from '../services/api';
import { Pokemon } from '../types/Pokemon';

interface PokemonContextProps {
    pokemons: Pokemon[];
    fetchPokemons: (page: number, pageSize: number) => Promise<void>;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const PokemonProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const fetchPokemons = async (page: number, pageSize: number): Promise<void> => {
        try {
            const response = await getPokemons(pageSize, (page - 1) * pageSize);
            setPokemons(response);
        } catch (error) {
            console.error('Erro ao buscar Pokémon:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchPokemons(1, 50);
    }, []);

    return (
        <PokemonContext.Provider value={{ pokemons, fetchPokemons }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemon = (): PokemonContextProps => {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error('usePokemon deve ser usado dentro de um PokemonProvider');
    }
    return context;
};
