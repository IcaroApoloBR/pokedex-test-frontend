import { useEffect, useState } from 'react';
import axios from 'axios';

interface TypeFilterProps {
    onSelectType: (type: string) => void;
}

const TypeFilter = ({ onSelectType }: TypeFilterProps) => {
    const [types, setTypes] = useState<string[]>([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/type/');
                const fetchedTypes = response.data.results.map((type: any) => type.name);
                setTypes(fetchedTypes);
            } catch (error) {
                console.error('Error fetching Pokémon types', error);
            }
        };

        fetchTypes();
    }, []);

    return (
        <div>
            <select
                className="hover:scale-95 duration-300 bg-whitePrimary dark:bg-darkSecondary rounded-lg shadow-sm shadow-colorSecondary border-2 border-colorSecondary p-3 text-sm text-gray-900 dark:text-gray-200 focus:border-colorPrimary outline-colorPrimary font-medium"
                onChange={(e) => onSelectType(e.target.value)}>
                <option value="">All types</option>
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TypeFilter;