import { motion } from 'framer-motion';
import { PokemonTypeColor } from '../utils/PokemonTypeColor';
import { Pokemon } from '../types/Pokemon';

const PokemonCardDetail = (pokemon: Pokemon) => {
    const detailPokemon = pokemon.pokemon

    const stagger = 0.1;

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const pokemonType = detailPokemon.type[0];
    const TypeColorDynamic: typeof PokemonTypeColor = PokemonTypeColor[pokemonType] || 'unknown';

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
            className={`w-auto p-4 rounded-2xl text-lg border-2 ${TypeColorDynamic} bg-whitePrimary dark:bg-darkSecondary shadow-md bg-opacity-40 text-gray-900 dark:text-gray-200 duration-500 hover:scale-95`}>
            <div className="relative h-full flex flex-col items-center justify-center gap-2">
                <img alt={detailPokemon.name} src={detailPokemon.img} className="object-cover w-16" />

                <div className=" flex items-center justify-center gap-1">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-gray-200">{detailPokemon.name}</h2>
                    <span className={`absolute top-2 right-2 font-semibold text-sm ${TypeColorDynamic}`}>#{detailPokemon.id}</span>
                </div>
                <div className=" text-sm flex gap-1 text-gray-900 dark:text-gray-200">
                    <span className={`${TypeColorDynamic}`}>Types:</span>
                    {detailPokemon.type.map((type, index) => {
                        return (
                            <div key={index}>
                                {type}
                            </div>
                        )
                    })}
                </div>

                <div className="text-gray-900 dark:text-gray-200 text-sm">
                    <h2 className="font-bold">Abilities</h2>
                    {detailPokemon.abilities.map((ability, index) => (
                        <div key={index}>
                            <span>{ability}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col justify-center gap-1 text-gray-900 dark:text-gray-200 text-sm">
                    <div className="flex text-center items-center gap-4">
                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-gray-200">Base experience</h2>
                            <span>{detailPokemon.base_experience}</span>
                        </div>

                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-gray-200">Height</h2>
                            <span>{detailPokemon.height}</span>
                        </div>

                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-gray-200">Weight</h2>
                            <span>{detailPokemon.weight}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col text-center text-sm">
                    <h2 className="font-bold text-gray-900 dark:text-gray-200">Stats</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <span>attack ({detailPokemon.status.attack})</span>
                        <span>defense ({detailPokemon.status.defense})</span>
                        <span>hp ({detailPokemon.status.hp})</span>
                        <span>special_attack ({detailPokemon.status.special_attack})</span>
                        <span>special_defense ({detailPokemon.status.special_defense})</span>
                        <span>speed ({detailPokemon.status.speed})</span>
                    </div>
                </div>
            </div>
        </motion.div >
    )
}

export default PokemonCardDetail;