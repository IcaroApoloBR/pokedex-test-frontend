import { useState } from 'react';

interface SortDropdownProps {
    onSortChange: (order: 'asc' | 'desc') => void;
}

const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (order: 'asc' | 'desc') => {
        setSortOrder(order);
        onSortChange(order);
    };

    return (
        <select
            className="hover:scale-95 duration-300 bg-whitePrimary dark:bg-darkSecondary rounded-lg border-2 border-colorSecondary p-3 text-sm text-gray-900 dark:text-gray-200 focus:border-colorPrimary outline-colorPrimary"
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value as 'asc' | 'desc')}
        >
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
        </select>
    );
};

export default SortDropdown;
