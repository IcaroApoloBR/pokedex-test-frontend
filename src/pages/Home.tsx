import { useEffect, useState } from "react";
import ToggleDarkMode from "../components/FiltersBar/ToggleDarkMode";
import Pokedex from "../components/Pokedex";
import { getPokemonData, getPokemons, searchPokemon } from "../services/api";
import SearchBar from "../components/FiltersBar/SearchBar";
import TypeFilter from "../components/FiltersBar/TypeFilter";
import SortDropdown from "../components/FiltersBar/SortDropdown";
import { ErrorMessage } from "../components/ErrorMessage";
import { toast } from "react-toastify";

export default function Home() {
    const itensPerPage = 50;
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isLoadingFetch, setIsLoadingFetch] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const [pokemonsList, setPokemonsList] = useState([]);

    const fetchPokemons = async () => {
        try {
            setIsLoadingFetch(true);
            setNotFound(false);

            const data = await getPokemons(itensPerPage, itensPerPage * page);
            const promises = data.results.map(async (pokemon) => {
                return await getPokemonData(pokemon.url);
            });

            const results = await Promise.all(promises);
            setPokemonsList(results);

            setIsLoadingFetch(false);
            setTotalPages(Math.ceil(data.count / itensPerPage));
        } catch (error) {
            console.log("fetchPokemons error: ", error);
        } finally {
            setIsLoadingFetch(false);
        }
    };

    const handleTypeSelect = (type: string) => {
        const lowercasedType = type.toLowerCase();
        setPokemonsList((prevPokemonsList) => {
            const filteredPokemons = type
                ? prevPokemonsList.filter((pokemon) =>
                    pokemon.types.some((t) => t.type.name.includes(lowercasedType))
                )
                : prevPokemonsList;

            return filteredPokemons;
        });
    };

    const sortPokemons = (order: 'asc' | 'desc') => {
        const sortedPokemons = [...pokemonsList];

        sortedPokemons.sort((a, b) => {
            const orderA = a.name.toUpperCase();
            const orderZ = b.name.toUpperCase();

            return order === 'asc' ? orderA.localeCompare(orderZ) : orderZ.localeCompare(orderA);
        });
        setPokemonsList(sortedPokemons);
    };

    const onSearchHandler = async (pokemon) => {
        if (!pokemon) {
            return fetchPokemons();
        }

        try {
            setIsLoadingFetch(true);

            const foundPokemon = await searchPokemon(pokemon);

            if (foundPokemon) {
                setPokemonsList([foundPokemon]);
                setPage(0);
                setTotalPages(1);
            }
        } catch (error) {
            setNotFound(true);
            setErrorMessage("Sorry trainer, no Pokemon found.");
        } finally {
            setIsLoadingFetch(false);
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, [page]);

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

                {notFound ? (
                    <ErrorMessage message={errorMessage} />
                ) : (
                    <Pokedex
                        pokemons={pokemonsList}
                        isLoadingFetch={isLoadingFetch}
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                )}
            </div>
        </section >
    )
}
