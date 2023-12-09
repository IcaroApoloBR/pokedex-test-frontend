import { motion } from 'framer-motion';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
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
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-whitePrimary dark:bg-darkSecondary rounded-lg border-2 shadow-sm shadow-colorSecondary border-colorSecondary p-3 text-sm text-gray-900 dark:text-gray-200 focus:border-colorPrimary outline-colorPrimary font-medium"
            />
        </motion.div>
    );
};

export default SearchBar;
