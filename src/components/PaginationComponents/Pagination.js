import React, { useState } from 'react';

const CustomPagination = ({ totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            onPageChange(newPage);
        }
    };
    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 5; 
        let startPage = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
        let endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);
        if (endPage - startPage < maxVisibleButtons - 1) {
            startPage = Math.max(endPage - maxVisibleButtons + 1, 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <div
                    key={i}
                    className={`circle m-1 ${i === currentPage ? 'active-page' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </div>
            );
        }
    
        return buttons;
    };
    

    return (
        <div>
             <div>
        <span>Page {currentPage} of {totalPages}</span>
      </div>
            <div className='d-flex justify-content-center text-center'>
                <div className={`circle m-1 ${currentPage === 1 ? 'hide-button' : ''}`} onClick={() => handlePageChange(currentPage - 1)} >
                    <i className={`fa fa-angle-left`} />
                </div>
                {renderPaginationButtons()}
                <div className={`circle m-1  ${currentPage === totalPages ? 'hide-button' : ''}`} onClick={() => handlePageChange(currentPage + 1)}>
                    <i className={`fa fa-angle-right`} />
                </div>
            </div>
        </div>
    );
};

export default CustomPagination;
