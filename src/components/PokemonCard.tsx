import { motion } from 'framer-motion';
import { PokemonTypeColor } from '../utils/PokemonTypeColor';

const PokemonCard = (props: any) => {
    const { pokemon } = props;

    const stagger = 0.1;

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const pokemonType = pokemon.types[0].type.name.toLowerCase() as keyof typeof PokemonTypeColor;
    const TypeColorDynamic = PokemonTypeColor[pokemonType] || 'unknown';

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
                delay: pokemon.id * stagger,
                ease: "easeInOut",
                duration: 0.5,
            }}
            viewport={{ amount: 0 }}
            className={`w-48 h-48 rounded-2xl border-2 ${TypeColorDynamic} bg-whitePrimary dark:bg-darkSecondary shadow-md bg-opacity-40 text-gray-900 dark:text-gray-200 duration-500 hover:scale-95`}>
            <div className="relative h-full flex flex-col items-center justify-center gap-2">
                {/* <img alt={pokemon.name} src={pokemon.sprites.front_default} className="object-cover" /> */}
                <img alt={pokemon.name} src={pokemon.sprites.other.dream_world.front_default} className="object-cover w-16" />

                <div className=" flex items-center justify-center gap-1">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-gray-200">{pokemon.name}</h2>
                    <span className={`absolute top-2 right-2 font-semibold text-sm ${TypeColorDynamic}`}>#{pokemon.id}</span>
                </div>
                <div className=" text-sm flex gap-1 text-gray-900 dark:text-gray-200">
                    <span className={`${TypeColorDynamic}`}>Types:</span>
                    {pokemon.types.map((type, index) => {
                        return (
                            <div key={index}>
                                {type.type.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        </motion.div>
    )
}

export default PokemonCard;
