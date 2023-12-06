import { useState, ChangeEvent } from "react";
import { motion } from 'framer-motion';
import { Icon } from "@iconify/react/dist/iconify.js";

interface SearchBarProps {
    onSearch: (searchTerm: string | undefined) => void;
}

const SearchBar = (props: SearchBarProps) => {
    const [search, setSearch] = useState<string>('');
    const { onSearch } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (e.target.value.length === 0) {
            onSearch(undefined);
        }
    }

    const onButtonClickHandler = () => {
        onSearch(search);
    }

    const onClearSearch = () => {
        onSearch('');
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.0 }}
            className="flex items-start flex-wrap gap-4"
        >
            <input
                type="text"
                placeholder="Search by name or type"
                onChange={onChangeHandler}
                value={search}
                className="bg-whitePrimary dark:bg-darkSecondary rounded-lg border-2 shadow-sm shadow-colorSecondary border-colorSecondary p-3 text-sm text-gray-900 dark:text-gray-200 focus:border-colorPrimary outline-colorPrimary font-medium"
            />

            <div className="flex items-center gap-4 hover:scale-95 duration-300">
                <button
                    type="button"
                    onClick={onButtonClickHandler}
                    className="flex  gap-1 items-center bg-whitePrimary dark:bg-darkSecondary rounded-lg shadow-sm shadow-colorSecondary border-2 border-colorSecondary p-3 text-sm text-gray-900 dark:text-gray-200 focus:border-colorPrimary outline-colorPrimary font-medium"
                >
                    Search
                    <Icon icon="material-symbols:search" width="16" height="16" color="#2a75bb" />
                </button>
            </div>

            <div className="flex items-center gap-4 hover:scale-95 duration-300">
                <button
                    type="button"
                    onClick={onClearSearch}
                    className="flex  gap-1 items-center bg-whitePrimary dark:bg-darkSecondary rounded-lg shadow-sm shadow-colorSecondary border-2 border-colorSecondary p-3 text-sm text-gray-900 dark:text-gray-200 focus:border-colorPrimary outline-colorPrimary font-medium"
                >
                    Clear
                    <Icon icon="mdi:clear-outline" width="16" height="16" color="#2a75bb" />
                </button>
            </div>
        </motion.div>
    )
}

export default SearchBar;