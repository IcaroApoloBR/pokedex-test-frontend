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
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { createTeam } from "../services/api";
import { toast } from "react-toastify";
import { storageUserGet, storageUserRefresh } from "../storage/storageUser";
import { Team, User } from "../types/User";

export default function Home() {
    const { pokemons, fetchPokemons } = usePokemon();

    const user: User = storageUserGet() || {
        token: "",
        email: "",
        id: "",
        name: "",
        created_at: "",
        team: {
            id: "",
            name: "",
            deleted_at: null,
            created_at: "",
            updated_at: "",
            user_id: "",
            pokemon: [] as Pokemon[],
        }
    };

    console.log(user)

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('');

    const [openModalCreateTeam, setOpenModalCreateTeam] = useState<boolean>(false);
    const [nameTeam, setNameTeam] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(25);

    const sortPokemons = (a: Pokemon, b: Pokemon): number => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else if (sortOrder === 'desc') {
            return b.name.localeCompare(a.name);
        } else {
            return a.id - b.id;
        }
    };

    const filteredAndSortedPokemons: Pokemon[] = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType ? pokemon.type.includes(filterType) : true)
    ).sort(sortPokemons);

    const uniqueTypes = Array.from(
        new Set(pokemons.flatMap((pokemon) => pokemon.type))
    );

    function handleCleanModal() {
        setNameTeam('')
        setOpenModalCreateTeam(false);
    }

    const createTeamPokemon = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true)

        try {
            await createTeam(nameTeam)

            console.log('user')
            const currentUser = storageUserGet();
            console.log(currentUser)
            console.log('currentUser')


            if (currentUser) {
                const updatedUser: Partial<User> = currentUser;

                if (!updatedUser.team) {
                    updatedUser.team = {} as Team
                }

                updatedUser.team.name

                storageUserRefresh(updatedUser);
            }

            toast.success("Team successfully created");

        } catch (error) {
            console.log('error: ', error);
            toast.error("Error creating team")

        } finally {
            setOpenModalCreateTeam(false)
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchPokemons(currentPage, itemsPerPage);
    }, [currentPage, itemsPerPage]);

    return (
        <>
            <Modal title="Create Pokemon Team" open={openModalCreateTeam ? true : false} onClose={handleCleanModal}>
                <form onSubmit={createTeamPokemon}>
                    <div className="p-6 space-y-4">
                        <div className="flex flex-col gap-4">
                            <input type="text" placeholder="Team name" value={nameTeam}
                                onChange={(e) => setNameTeam(e.target.value)}
                                className="bg-whitePrimary dark:bg-darkSecondary rounded-lg border-2 shadow-sm shadow-colorSecondary border-colorSecondary p-3 text-sm text-gray-900 dark:text-gray-200 focus:border-colorPrimary outline-colorPrimary font-medium"
                            />
                            <span className="text-gray-900 dark:text-gray-200 text-xs font-medium">
                                * Only when creating a team, you can add up to a maximum of 5 Pokemons assigned to it
                            </span>
                        </div>

                        <div className="flex items-center justify-end p-4 space-x-6 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button type="button" className="text-gray-900 dark:text-gray-200 hover:scale-95 hover:bg-opacity-70 transition-all" onClick={handleCleanModal}>Close</button>
                            <Button type="submit">{isLoading ? "Creating" : "Create"}</Button>
                        </div>

                    </div>
                </form>
            </Modal >

            <section className="w-full h-full bg-whiteSecondary dark:bg-darkPrimary">
                <div className="mt-20 p-6 min-h-screen max-w-7xl mx-auto">
                    <div className="w-full flex items-center justify-between flex-wrap gap-4 mb-4">
                        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                        <div className="flex flex-wrap items-start gap-4">
                            <TypeFilter filterType={filterType} onFilterTypeChange={setFilterType} uniqueTypes={uniqueTypes} />
                            <SortOrder sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
                            <ToggleDarkMode />
                        </div>

                        {user.team ?
                            <span className="text-gray-900 dark:text-gray-200 hover:scale-95">
                                View team on profile page
                            </span>
                            :
                            <Button type="button"
                                onClick={() => setOpenModalCreateTeam(true)}
                            >
                                Create team
                            </Button>
                        }
                    </div>

                    {filteredAndSortedPokemons.length === 0 && <ErrorMessage message="* Sorry, no pokemon found based on your recent search" />}

                    {pokemons.length !== 0 ? (
                        <Pokedex
                            allPokemons={filteredAndSortedPokemons}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    ) : (
                        <LoadingScreen>
                            <p className="text-gray-200 font-medium text-xl">
                                Wait, <span className="text-redSecondary font-semibold">listing</span> all pokemons ...
                            </p>
                        </LoadingScreen>
                    )}
                </div>
            </section >
        </>
    )
}
