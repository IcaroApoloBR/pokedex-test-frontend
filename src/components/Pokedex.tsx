import { Link } from 'react-router-dom';
import { LoadingScreen } from './LoadingScreen';
import Pagination from './Pagination';
import PokemonCard from './PokemonCard';
import { usePokemonContext } from '../context/PokemonContext';

interface PokedexProps {
    pokemons: [];
    isLoadingFetch: boolean;
    totalPages: number;
}

const Pokedex = ({ pokemons, isLoadingFetch, totalPages }: PokedexProps) => {
    const { page, setPage } = usePokemonContext();

    const onLeftClickHandler = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const onRightClickHandler = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    return (
        <section className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center">
                <Pagination
                    page={page + 1}
                    totalPages={totalPages}
                    onLeftClick={onLeftClickHandler}
                    onRightClick={onRightClickHandler}
                />

                {isLoadingFetch ? (
                    <LoadingScreen>
                        <p className="text-gray-200 font-medium text-xl">
                            Wait, <span className="text-redSecondary font-semibold">listing</span> all pokemons ...
                        </p>
                    </LoadingScreen>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-6 justify-center items-center">
                            {pokemons && pokemons.map((pokemon, index) => (
                                <Link to={`/detail/${pokemon.id}`} key={index}>
                                    <PokemonCard key={index} pokemon={pokemon} />
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Pokedex;
