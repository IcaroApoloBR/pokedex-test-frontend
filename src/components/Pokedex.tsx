import { Link } from 'react-router-dom';
import { LoadingScreen } from './LoadingScreen';
import Pagination from './Pagination';
import PokemonCard from './PokemonCard';
// import { useEffect, useState } from 'react';
// import { Modal } from './Modal';
// import { getPokemonEvolution } from '../services/api';

interface PokedexProps {
    pokemons: [];
    isLoadingFetch: boolean;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
}

const Pokedex = ({ pokemons, isLoadingFetch, page, setPage, totalPages }: PokedexProps) => {
    const onLeftClickHandler = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const onRightClickHandler = () => {
        if (page + 1 !== totalPages) {
            setPage(page + 1);
        }
    };

    // const [selectedPokemon, setSelectedPokemon] = useState(null);
    // const [evolutionData, setEvolutionData] = useState(null);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const openModal = (pokemon) => {
    //     setSelectedPokemon(pokemon);
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setSelectedPokemon(null);
    //     setIsModalOpen(false);
    //     setEvolutionData(null);
    // }

    // useEffect(() => {
    //     if (selectedPokemon) {
    //         getPokemonEvolution(selectedPokemon.id)
    //             .then((evolutionData) => {
    //                 console.log(evolutionData);
    //                 setEvolutionData(evolutionData);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching evolution data: ", error);
    //             });
    //     }
    // }, [selectedPokemon]);

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
                        <div className="flex flex-wrap gap-6 justify-center">
                            {pokemons && pokemons.map((pokemon, index) => (
                                // <div key={index} onClick={() => openModal(pokemon)} className="cursor-pointer">
                                //     <PokemonCard pokemon={pokemon} />
                                // </div>
                                <Link to={`/detail/${pokemon.id}`} key={index}>
                                    <PokemonCard key={index} pokemon={pokemon} />
                                </Link>
                            ))}
                        </div>

                        {/* <Modal
                            open={isModalOpen}
                            onClose={closeModal}
                            title={`Evoluções do Pokemon:`}
                        >
                            {evolutionData && renderEvolutionChain(evolutionData.chain)}
                        </Modal> */}
                    </>
                )}
            </div>
        </section>
    );
};

export default Pokedex;