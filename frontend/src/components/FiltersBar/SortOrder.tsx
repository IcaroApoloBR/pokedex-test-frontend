interface SortOrderProps {
    sortOrder: string;
    onSortOrderChange: (value: string) => void;
}

const SortOrder = ({ sortOrder, onSortOrderChange }: SortOrderProps) => {
    return (
        <select value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value)}
            className="hover:scale-95 duration-300 bg-whitePrimary dark:bg-darkSecondary rounded-lg shadow-sm shadow-colorSecondary border-2 border-colorSecondary p-3 text-sm text-gray-900 dark:text-gray-200 focus:border-colorPrimary outline-colorPrimary font-medium"
        >
            <option value="">No ordering</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
        </select>
    );
};

export default SortOrder;

