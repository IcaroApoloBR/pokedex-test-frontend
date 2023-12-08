import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPokemonDetails, PokemonDetails } from '../services/api';
import { LoadingScreen } from '../components/LoadingScreen';
import { Button } from '../components/Button';
import ToggleDarkMode from '../components/FiltersBar/ToggleDarkMode';

interface DetailProps {
    id: string;
}

function Detail() {
    const { id } = useParams<DetailProps>();
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

    useEffect(() => {
        async function fetchPokemonDetails() {
            try {
                const details = await getPokemonDetails(id);
                setPokemonDetails(details);
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
        }

        fetchPokemonDetails();
    }, [id]);

    return (
        <>
            <section className="w-full h-full bg-whiteSecondary dark:bg-darkPrimary">
                <div className='mt-20 p-4 flex justify-between'>
                    <Button type="button">
                        <Link to="/">
                            Back
                        </Link>
                    </Button>

                    <ToggleDarkMode />
                </div>

                {pokemonDetails ? (
                    <div className="flex flex-col items-center gap-2">
                        <div className=" flex items-center justify-center gap-1">
                            <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-200">{pokemonDetails.name} #{pokemonDetails.id}</h2>
                        </div>

                        <div className=" text-sm flex gap-1 text-gray-900 dark:text-gray-200">
                            {pokemonDetails.types.map((type, index) => {
                                return (
                                    <div key={index} className="p-1 border-2 rounded-lg  shadow-sm ">
                                        {type.type.name}
                                    </div>
                                )
                            })}
                        </div>

                        <img alt={pokemonDetails.name} src={pokemonDetails.sprites.other.dream_world.front_default} className="object-cover w-40" />

                        <div className="flex flex-col gap-1 text-gray-900 dark:text-gray-200">
                            <div className="flex items-end gap-2">
                                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-200">Base experience</h2>
                                <span>{pokemonDetails.base_experience}</span>
                            </div>
                            <div className="flex items-end gap-2 justify-between">
                                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-200">Height</h2>
                                <span>{pokemonDetails.height}</span>
                            </div>
                            <div className="flex items-end gap-2 justify-between">
                                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-200">Weight</h2>
                                <span>{pokemonDetails.weight}</span>
                            </div>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-200">Stats</h2>
                                {pokemonDetails.stats.map((stat, index) => (
                                    <div key={index} className="grid grid-cols-2 gap-4 text-gray-900 dark:text-gray-200 ">
                                        <span>{stat.stat.name}</span>
                                        <span>{stat.base_stat}</span>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-200">Abilities</h2>
                                {pokemonDetails.abilities.map((ability, index) => (
                                    <div key={index} className="text-gray-900 dark:text-gray-200 ">
                                        <span>{ability.ability.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div >
                ) : (
                    <LoadingScreen>
                        <p className="text-gray-200 font-medium text-xl">
                            Wait, <span className="text-redSecondary font-semibold">filtering </span>  by the selected pokemon ...
                        </p>
                    </LoadingScreen>
                )}
            </section>
        </>
    );
}

export default Detail;