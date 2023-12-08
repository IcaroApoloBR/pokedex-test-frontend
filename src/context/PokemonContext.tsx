import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { getPokemons, getPokemonData, searchPokemon } from '../services/api';

interface Pokemon {
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

interface PokemonContextProps {
    pokemonsList: Pokemon[];
    setPokemonsList: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    originalPokemonsList: Pokemon[];
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    totalPages: number;
    isLoadingFetch: boolean;
    setIsLoadingFetch: Dispatch<SetStateAction<boolean>>;
    notFound: boolean;
    setNotFound: Dispatch<SetStateAction<boolean>>;
    fetchPokemons: (itensPerPage: number, page: number) => Promise<void>;
    searchPokemons: (searchTerm: string) => Promise<void>;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([]);
    const [originalPokemonsList, setOriginalPokemonsList] = useState<Pokemon[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isLoadingFetch, setIsLoadingFetch] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);

    const fetchPokemons = async (itensPerPage: number, newPage: number) => {
        try {
            setIsLoadingFetch(true);
            setNotFound(false);

            const data = await getPokemons(itensPerPage, itensPerPage * (newPage - 1));
            const promises = data.results.map(async (pokemon) => {
                return await getPokemonData(pokemon.url);
            });

            const results = await Promise.all(promises);
            setPokemonsList(results);
            setOriginalPokemonsList(results);
            setPage(newPage);

            setIsLoadingFetch(false);
            setTotalPages(Math.ceil(data.count / itensPerPage));
        } catch (error) {
            console.log('fetchPokemons error: ', error);
            setNotFound(true);
        } finally {
            setIsLoadingFetch(false);
        }
    };

    const searchPokemons = async (searchTerm: string) => {
        try {
            console.log('searchTerm inside searchPokemons:', searchTerm);
            setIsLoadingFetch(true);
            setNotFound(false);

            const foundPokemon = await searchPokemon(searchTerm);

            console.log('foundPokemon inside searchPokemons:', foundPokemon);

            if (foundPokemon) {
                setPokemonsList([foundPokemon]);
                setPage(1);
                setTotalPages(1);
                console.log('a');
            } else {
                console.log('b');
                setPokemonsList([]);
                setPage(0);
                setTotalPages(0);
                setNotFound(true);
            }
        } catch (error) {
            console.error('searchPokemons error: ', error);
            setNotFound(true);
        } finally {
            setIsLoadingFetch(false);
        }
    };





    const contextValue: PokemonContextProps = {
        pokemonsList,
        setPokemonsList,
        originalPokemonsList,
        page,
        setPage,
        totalPages,
        isLoadingFetch,
        setIsLoadingFetch,
        notFound,
        setNotFound,
        fetchPokemons,
        searchPokemons,
    };

    return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
};

export const usePokemonContext = (): PokemonContextProps => {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error('usePokemonContext must be used within a PokemonProvider');
    }
    return context;
};
