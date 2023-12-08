import { useEffect, useState } from "react";
import ToggleDarkMode from "../components/FiltersBar/ToggleDarkMode";
import Pokedex from "../components/Pokedex";
import SearchBar from "../components/FiltersBar/SearchBar";
import TypeFilter from "../components/FiltersBar/TypeFilter";
import SortDropdown from "../components/FiltersBar/SortDropdown";
import { ErrorMessage } from "../components/ErrorMessage";

import { usePokemonContext } from '../context/PokemonContext';

export default function Home() {

    const { pokemonsList, setPokemonsList, originalPokemonsList, page, totalPages, isLoadingFetch, setIsLoadingFetch, notFound, setNotFound, fetchPokemons, searchPokemons } = usePokemonContext();
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetchPokemons(50, 1);
    }, []);

    const handleTypeSelect = (type: string) => {
        setPokemonsList((prevPokemonsList) => {
            if (!type) {
                setErrorMessage(null);
                return originalPokemonsList;
            }

            const filteredPokemons = originalPokemonsList.filter((pokemon) =>
                pokemon.types.some((t) => t.type.name.includes(type))
            );

            if (filteredPokemons.length === 0) {
                setErrorMessage("Sorry trainer, no Pokemon of the selected type found.");
            } else {
                setErrorMessage(null);
            }


            return filteredPokemons;
        });
    };

    const sortPokemons = (order: 'asc' | 'desc') => {
        setPokemonsList((prevPokemonsList) => {
            const sortedPokemons = [...prevPokemonsList];

            sortedPokemons.sort((a, b) => {
                const orderA = a.name.toUpperCase();
                const orderZ = b.name.toUpperCase();

                return order === 'asc' ? orderA.localeCompare(orderZ) : orderZ.localeCompare(orderA);
            });

            return sortedPokemons;
        });
    };

    const onSearchHandler = async (searchTerm: string) => {
        try {
            setIsLoadingFetch(true);
            setNotFound(false);
            setErrorMessage(null);

            if (!searchTerm) {
                await fetchPokemons(50, 1);
            } else {

                const foundPokemon = await searchPokemons(searchTerm);

                console.log('foundPokemon:', foundPokemon);

                if (foundPokemon) {
                    setPokemonsList([foundPokemon]);
                } else {
                    setPokemonsList([]);
                    setNotFound(true);
                    setErrorMessage("Sorry trainer, no Pokemon found.");
                }
            }
        } catch (error) {
            console.error('onSearchHandler error:', error);
            setNotFound(true);
            setErrorMessage("Sorry, an error occurred during the search. Please try again.");
        } finally {
            setIsLoadingFetch(false);
        }
    };

    return (
        <section className="w-full h-full bg-whiteSecondary dark:bg-darkPrimary">
            <div className="mt-20 p-6 min-h-screen">
                <div className="w-full flex items-center justify-between flex-wrap gap-4">
                    <SearchBar onSearch={onSearchHandler} />

                    <div className="flex items-start gap-4">
                        <TypeFilter onSelectType={handleTypeSelect} />
                        <SortDropdown onSortChange={sortPokemons} />
                        <ToggleDarkMode />
                    </div>
                </div>

                {notFound || errorMessage ? (
                    <ErrorMessage message={errorMessage} />
                ) : (
                    <Pokedex
                        pokemons={pokemonsList}
                        isLoadingFetch={isLoadingFetch}
                        page={page}
                        totalPages={totalPages}
                    />
                )}
            </div>
        </section >
    )
}
