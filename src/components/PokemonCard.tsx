import { motion } from 'framer-motion';
import { PokemonTypeColor } from '../utils/PokemonTypeColor';
import { Pokemon } from '../types/Pokemon';
import { addPokeTeam } from '../services/api';
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { User } from '../types/User';
import { storageUserGet } from '../storage/storageUser';

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

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const detailPokemon = pokemon

    const stagger = 0.1;

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const pokemonType = detailPokemon.type[0];
    const TypeColorDynamic: string = PokemonTypeColor[pokemonType];

    const addPokemonToTeam = async () => {
        setIsLoading(true)

        try {
            await addPokeTeam(
                detailPokemon.name,
                String(detailPokemon.id)
            )

            toast.success("Pokemon add to team");
        } catch (error) {
            console.log('error: ', error);
            toast.error("Error adding pokemon team")
        } finally {
            setIsLoading(false)
        }
    };

    function isPokemonInTeam(pokemonName: string, pokemonList?: Pokemon[]): boolean {
        return pokemonList?.some((p) => p.name === pokemonName) || false;
    }

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
                delay: detailPokemon.id * stagger,
                ease: "easeInOut",
                duration: 0.5,
            }}
            viewport={{ amount: 0 }}
            className={`w-64 h-64 rounded-2xl text-lg border-2 ${TypeColorDynamic} bg-whitePrimary dark:bg-darkSecondary shadow-md bg-opacity-40 text-gray-900 dark:text-gray-200 duration-500 hover:scale-95`}>
            <div className="relative h-full flex flex-col items-center justify-center gap-2">
                <img alt={detailPokemon.name} src={detailPokemon.img} className="object-cover w-16" />

                <div className=" flex items-center justify-center gap-1">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-gray-200">{detailPokemon.name}</h2>
                    <span className={`absolute top-2 right-2 font-semibold text-sm ${TypeColorDynamic}`}>#{detailPokemon.id}</span>
                </div>
                <div className=" text-sm flex gap-1 text-gray-900 dark:text-gray-200">
                    <span className={`${TypeColorDynamic}`}>Types:</span>
                    {detailPokemon.type.map((type: string, index: number) => {
                        return (
                            <div key={index}>
                                {type}
                            </div>
                        )
                    })}
                </div>

                <button
                    type="button"
                    onClick={() => addPokemonToTeam()}
                    disabled={isPokemonInTeam(detailPokemon.name, user.team?.pokemon) || isLoading}
                    className="text-gray-900 dark:text-gray-200 text-sm font-medium hover:text-colorPrimary"
                >
                    {isPokemonInTeam(detailPokemon.name, user.team?.pokemon) ? "Already in team" : "Add team"}
                </button>

                <Link to={`/detail/${pokemon.id}`} key={pokemon.id}
                    className="text-gray-900 dark:text-gray-200 text-sm hover:text-colorPrimary hover:underline"
                >
                    See details
                </Link>
            </div>
        </motion.div>
    )
}

export default PokemonCard;
