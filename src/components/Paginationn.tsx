import { Icon } from '@iconify/react/dist/iconify.js';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const Paginationn: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage >= totalPages;

    const handlePageChange = (newPage: number) => {
        onPageChange(newPage);
      };      

    return (
        <div className="flex items-center gap-2 my-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isFirstPage}
                className={`pagination-button ${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-90'
                    } `}
            >
                <Icon icon="mingcute:left-fill" color="#2a75bb" width="36" height="36" />
            </button>

            <span className="text-gray-900 dark:text-gray-200 font-medium text-lg">
                Page {currentPage} of {totalPages} pages
            </span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isLastPage}
                className={`pagination-button ${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-90'
                    } `}
            >
                <Icon icon="mingcute:right-fill" color="#2a75bb" width="36" height="36" />
            </button>
        </div>
    );
};

export default Paginationn;