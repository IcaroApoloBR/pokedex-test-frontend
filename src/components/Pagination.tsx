import { Icon } from "@iconify/react/dist/iconify.js";

const Pagination = (props) => {
    const { page, totalPages, onLeftClick, onRightClick } = props

    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    return (
        <div className="flex items-center gap-2 my-4">
            <button
                onClick={onLeftClick}
                disabled={isFirstPage}
                className={`${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer'} `}
            >
                <Icon icon="mingcute:left-fill" color="#2a75bb" width="32" />
            </button>

            <span className="text-gray-900 dark:text-gray-200 font-medium text-lg">
                {page} of {totalPages} pages
            </span>

            <button
                onClick={onRightClick}
                disabled={isLastPage}
                className={`${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer'} `}
            >
                <Icon icon="mingcute:right-fill" color="#2a75bb" width="32" />
            </button>
        </div>
    )
}

export default Pagination;