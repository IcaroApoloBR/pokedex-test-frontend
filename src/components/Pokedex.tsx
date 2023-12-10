import { Link } from 'react-router-dom';
import { LoadingScreen } from './LoadingScreen';
// import Pagination from './Pagination';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../types/Pokemon';


const Pokedex = ({ allPokemons }: Pokemon) => {

    // const onLeftClickHandler = () => {
    //     if (page > 0) {
    //         setPage(page - 1);
    //     }
    // };

    // const onRightClickHandler = () => {
    //     if (page < totalPages - 1) {
    //         setPage(page + 1);
    //     }
    // };

    return (
        <section className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center">
                {/* <Pagination
                    page={page + 1}
                    totalPages={totalPages}
                    onLeftClick={onLeftClickHandler}
                    onRightClick={onRightClickHandler}
                /> */}

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
                                <Link to={`/detail/${pokemon.id}`} key={pokemon.id}>
                                    <PokemonCard pokemon={pokemon} />
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
