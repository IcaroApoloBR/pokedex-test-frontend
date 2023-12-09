import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { searchPokemon } from '../services/api';
import { LoadingScreen } from '../components/LoadingScreen';
import { Button } from '../components/Button';
import ToggleDarkMode from '../components/FiltersBar/ToggleDarkMode';
import { Pokemon } from '../types/Pokemon';
import PokemonCardDetail from '../components/PokemonCardDetail';

function Detail() {
    const { id } = useParams<string>();
    const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    async function fetchPokemonDetails() {
        setIsLoading(true)
        try {
            const details = await searchPokemon(id);
            setPokemonDetails(details);
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPokemonDetails();
    }, [id]);

    return (
        <>
            <section className="w-full h-full bg-whiteSecondary dark:bg-darkPrimary flex flex-col items-center justify-between gap-8">
                <div className='w-full mt-20 p-4 flex items-center justify-between'>
                    <Button type="button">
                        <Link to="/">
                            Back
                        </Link>
                    </Button>

                    <ToggleDarkMode />
                </div>

                {pokemonDetails && !isLoading ? (
                    <PokemonCardDetail pokemon={pokemonDetails} />
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