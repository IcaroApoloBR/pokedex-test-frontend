import { useEffect, useState } from "react";
import Footer from "../components/LayoutDefault/Footer";
import Navbar from "../components/LayoutDefault/Navbar";
import PlayerMusic from "../components/PlayerMusic";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ToggleDarkMode from "../components/FiltersBar/ToggleDarkMode";
import Pokedex from "../components/Pokedex";
import { getPokemonData, getPokemons, searchPokemon, getPokemonEvolution } from "../services/api";
import Searchbar from "../components/FiltersBar/Searchbar";
import TypeFilter from "../components/FiltersBar/TypeFilter";
import SortDropdown from "../components/FiltersBar/SortDropdown";

export default function Home() {
    const itensPerPage = 50;
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isLoadingFetch, setIsLoadingFetch] = useState(false);
    const [notFound, setNotFound] = useState(false);

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
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
        setPokemonsList(sortedPokemons);
    };

    const onSearchHandler = async (pokemon) => {
        if (!pokemon) {
            return fetchPokemons();
        }

        setIsLoadingFetch(true)
        setNotFound(false)

        const result = await searchPokemon(pokemon)
        if (!result) {
            setNotFound(true)
        } else {
            setPokemonsList([result])
            setPage(0)
            setTotalPages(1)
        }
        setIsLoadingFetch(false)
    }

    useEffect(() => {
        fetchPokemons();
    }, [page]);

    return (
        <section className="w-full h-full bg-whiteSecondary dark:bg-darkPrimary">
            <Navbar />

            <div className="mt-20 p-6 h-full">
                <div className="w-full flex items-center justify-between flex-wrap gap-4">
                    <Searchbar onSearch={onSearchHandler} />

                    <div className="flex items-start gap-4">
                        <TypeFilter onSelectType={handleTypeSelect} />
                        <SortDropdown onSortChange={sortPokemons} />
                        <ToggleDarkMode />
                    </div>
                </div>

                {notFound ? (
                    <div className="flex justify-center h-screen">
                        <p className="text-colorSecondary font-semibold text-center my-8">
                            * Sorry trainer, unfortunately there are no Pokemon related to your search.
                        </p>
                    </div>) :
                    (<Pokedex
                        pokemons={pokemonsList}
                        isLoadingFetch={isLoadingFetch}
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />)}
            </div>

            <footer>
                <PlayerMusic />
                <ScrollToTopButton />
                <Footer />
            </footer>

        </section >
    )
}
