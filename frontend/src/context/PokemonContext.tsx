import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getPokemons } from '../services/api';
import { Pokemon } from '../types/Pokemon';

interface PokemonContextProps {
    pokemons: Pokemon[];
    fetchPokemons: (page: number, pageSize: number) => Promise<void>;
}

interface PokemonProviderProps {
    children: ReactNode;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const fetchPokemons = async (page: number, pageSize: number): Promise<void> => {
        try {
            const response = await getPokemons(pageSize, (page - 1) * pageSize);
            setPokemons(response as Pokemon[]);
        } catch (error) {
            console.log('error: ', error);
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
        throw new Error('usePokemon must be used within a PokemonProvider');
    }
    return context;
};
