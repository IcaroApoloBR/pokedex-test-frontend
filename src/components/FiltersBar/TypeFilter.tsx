interface TypeFilterProps {
    filterType: string;
    onFilterTypeChange: (value: string) => void;
    uniqueTypes: string[];
}

const TypeFilter = ({ filterType, onFilterTypeChange, uniqueTypes }: TypeFilterProps) => {
    return (
        <select value={filterType}
            onChange={(e) => onFilterTypeChange(e.target.value)}
            className="hover:scale-95 duration-300 bg-whitePrimary dark:bg-darkSecondary rounded-lg shadow-sm shadow-colorSecondary border-2 border-colorSecondary p-3 text-sm text-gray-900 dark:text-gray-200 focus:border-colorPrimary outline-colorPrimary font-medium"
        >
            <option value="">All types</option>
            {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default TypeFilter;