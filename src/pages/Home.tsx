import { useEffect, useState } from "react";
import { usePokemon } from "../context/PokemonContext";

import { Pokemon } from "../types/Pokemon";

import Pokedex from "../components/Pokedex";
import SearchBar from "../components/FiltersBar/SearchBar";
import TypeFilter from "../components/FiltersBar/TypeFilter";
import SortOrder from "../components/FiltersBar/SortOrder";
import ToggleDarkMode from "../components/FiltersBar/ToggleDarkMode";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingScreen } from "../components/LoadingScreen";


export default function Home() {
    const { pokemons, fetchPokemons } = usePokemon();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('');

    useEffect(() => {
        fetchPokemons(1, 50);
    }, []);

    const sortPokemons = (a: Pokemon, b: Pokemon): number => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else if (sortOrder === 'desc') {
            return b.name.localeCompare(a.name);
        }
        return 0;
    };

    const filteredAndSortedPokemons: Pokemon[] = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType ? pokemon.type.includes(filterType) : true)
    ).sort(sortPokemons);

    const uniqueTypes = Array.from(
        new Set(pokemons.flatMap((pokemon) => pokemon.type))
    );

    return (
        <section className="w-full h-full bg-whiteSecondary dark:bg-darkPrimary">
            <div className="mt-20 p-6 min-h-screen">
                <div className="w-full flex items-center justify-between flex-wrap gap-4 mb-4">
                    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                    <div className="flex flex-wrap items-start gap-4">
                        <TypeFilter filterType={filterType} onFilterTypeChange={setFilterType} uniqueTypes={uniqueTypes} />
                        <SortOrder sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
                        <ToggleDarkMode />
                    </div>
                </div>

                {filteredAndSortedPokemons.length === 0 && <ErrorMessage message="* Sorry, no pokemon found based on your recent search" />}

                {pokemons.length !== 0 ? (
                    <Pokedex allPokemons={filteredAndSortedPokemons} />
                ) : (
                    <LoadingScreen>
                        <p className="text-gray-200 font-medium text-xl">
                            Wait, <span className="text-redSecondary font-semibold">listing</span> all pokemons ...
                        </p>
                    </LoadingScreen>
                )}
            </div>
        </section >
    )
}
