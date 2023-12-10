import { LoadingScreen } from './LoadingScreen';
import Pagination from './Pagination';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../types/Pokemon';

interface PokedexProps {
    allPokemons: Pokemon;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage: number;
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pokedex = ({ allPokemons, currentPage, setCurrentPage, itemsPerPage }: PokedexProps) => {

    return (
        <section className="">
            <div className="flex flex-col items-center justify-center">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                />

                {1 == 2 ? (
                    <LoadingScreen>
                        <p className="text-gray-200 font-medium text-xl">
                            Wait, <span className="text-redSecondary font-semibold">listing</span> all Pokemons ...
                        </p>
                    </LoadingScreen>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-6 justify-center items-center">
                            {allPokemons && Array.isArray(allPokemons) && allPokemons.map((pokemon: Pokemon) => (
                                <PokemonCard pokemon={pokemon} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Pokedex;
