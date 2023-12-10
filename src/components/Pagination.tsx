import { Icon } from '@iconify/react/dist/iconify.js';

interface PaginationProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage: number;
}

const Pagination = ({ currentPage, setCurrentPage, itemsPerPage }: PaginationProps) => {

    const PreviousPage = () => {
        setCurrentPage(currentPage - 1)
    };

    const NextPage = () => {
        setCurrentPage(currentPage + 1)
    };

    return (
        <div className="flex items-center gap-2 my-4">
            <button
                onClick={PreviousPage}
                disabled={currentPage === 1}
                className={`${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-90'
                    } `}
            >
                <Icon icon="mingcute:left-fill" color="#2a75bb" width="36" height="36" />
            </button>

            <span className="text-gray-900 dark:text-gray-200 font-medium text-lg">
                {((currentPage * itemsPerPage) - itemsPerPage) + 1} a {currentPage * itemsPerPage} items
            </span>

            <button
                onClick={NextPage}
            >
                <Icon icon="mingcute:right-fill" color="#2a75bb" width="36" height="36" />
            </button>
        </div>
    );
};

export default Pagination;
