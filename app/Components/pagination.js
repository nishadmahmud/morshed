import React from 'react';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
    const generatePages = () => {
        const pages = [];
      console.log(currentPage);
        if (totalPage <= 7) {
            // Show all pages if total pages are less than or equal to 7
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
        } else {
            // Add the first page
            pages.push(1);

            // Add ellipsis if needed
            if (currentPage > 4) {
                pages.push('...');
            }

            // Add middle pages dynamically
            const start = Math.max(2, currentPage - 2);
            const end = Math.min(totalPage - 1, currentPage + 2);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Add ellipsis if needed
            if (currentPage < totalPage - 3) {
                pages.push('...');
            }

            // Add the last page
            pages.push(totalPage);
        }

        return pages;
    };

    const pages = generatePages();

    return (
        <div className="pagination flex gap-2 items-center">
            {/* Previous Button */}
            <button
                className="hover:bg-[#F16724] px-4 py-1 rounded-md hover:text-white transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <MdNavigateBefore />
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
                {pages.map((page, index) =>
                    page === '...' ? (
                        <span key={index} className="px-2">...</span>
                    ) : (
                        <button
                            key={index}
                            className={`p-2 rounded-md transition ${
                                page === currentPage
                                    ? 'bg-[#ff8800] text-white font-semibold'
                                    : 'bg-gray-200 text-black'
                            }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Next Button */}
            <button
                className="hover:bg-[#F16724] px-4 py-1 rounded-md hover:text-white transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === totalPage}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
                <MdNavigateNext />
            </button>
        </div>
    );
};

export default Pagination;
