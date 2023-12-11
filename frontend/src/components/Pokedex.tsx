import Pagination from './Pagination';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../types/Pokemon';

interface PokedexProps {
    allPokemons: Pokemon[];
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

                <div className="flex flex-wrap gap-6 justify-center items-center">
                    {allPokemons && Array.isArray(allPokemons) && allPokemons.map((pokemon: Pokemon) => (
                        <PokemonCard pokemon={pokemon} key={pokemon.id} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pokedex;
