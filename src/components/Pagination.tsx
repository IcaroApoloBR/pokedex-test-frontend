import { Icon } from '@iconify/react/dist/iconify.js';
import { usePokemonContext } from '../context/PokemonContext';

interface PaginationProps {
    page: number;
    totalPages: number;
    onLeftClick: () => void;
    onRightClick: () => void;
}

const Pagination: React.FunctionComponent<PaginationProps> = () => {
    const { page, totalPages, fetchPokemons } = usePokemonContext();

    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    const onLeftClick = () => {
        if (!isFirstPage) {
            fetchPokemons(50, page - 1);
        }
    };

    const onRightClick = () => {
        if (!isLastPage) {
            fetchPokemons(50, page + 1);
        }
    };

    return (
        <div className="flex items-center gap-2 my-4">
            <button
                onClick={onLeftClick}
                disabled={isFirstPage}
                className={`${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-90'
                    } `}
            >
                <Icon icon="mingcute:left-fill" color="#2a75bb" width="36" height="36" />
            </button>

            <span className="text-gray-900 dark:text-gray-200 font-medium text-lg">
                {page} of {totalPages} pages
            </span>

            <button
                onClick={onRightClick}
                disabled={isLastPage}
                className={`${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-90'
                    } `}
            >
                <Icon icon="mingcute:right-fill" color="#2a75bb" width="36" height="36" />
            </button>
        </div>
    );
};

export default Pagination;
