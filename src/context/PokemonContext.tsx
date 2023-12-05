// import { useState, useContext, createContext } from 'react';

// export const PokemonContext = createContext();

// export default function PokemonsProvider({ children }) {
//     const [pokemons, setPokemons] = useState([]);
//     const [currentPokemonId, setCurrentPokemonId] = useState(-1);

//     const currentPokemon = pokemons[currentPokemonId];

//     return (
//         <PokemonContext.Provider value={{ pokemons, setPokemons, currentPokemonId, setCurrentPokemonId, currentPokemon }}>
//             {children}
//         </PokemonContext.Provider>
//     );
// }

// export const usePokemons = () => {
//     return useContext(PokemonContext);
// };