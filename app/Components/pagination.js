import React from 'react';

const Pagination = ({currentPage,totalPage,onPageChange}) => {
    const generatePages = () => {
        const pages = [];
    
        if (totalPage <= 7) {
          // Show all pages if the total is less than or equal to 7
          for (let i = 1; i <= totalPage; i++) {
            pages.push(i);
          }
        } else {
          // Add the first page
          pages.push(1);
    
          // Add ellipsis before the middle pages if necessary
          if (currentPage > 4) {
            pages.push('...');
          }
    
          // Add middle pages
          const start = Math.max(2, currentPage - 2);
          const end = Math.min(totalPage - 1, currentPage + 2);
    
          for (let i = start; i <= end; i++) {
            pages.push(i);
          }
    
          // Add ellipsis after the middle pages if necessary
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
        <div className="pagination flex gap-5 ">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
          
            <div className='flex gap-2'>
              {
                pages.map((page, index) =>
                    page === '...' ? (
                        <span key={index} className="dots">
                        ...
                        </span>
                    ) : (
                        <button
                        key={index}
                        className={`page p-1 rounded-md ${page === currentPage ? 'bg-[#ff8800] text-white font-semibold' : 'bg-transparent text-black font-normal'}`}
                        onClick={() => onPageChange(page)}
                        >
                        {page}
                        </button>
                    )
                    )
              }
            </div>
          
          <button
            disabled={currentPage === totalPage}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      );
};

export default Pagination;