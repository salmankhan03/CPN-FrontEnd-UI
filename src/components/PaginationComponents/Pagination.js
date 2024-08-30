import React, { useState } from 'react';

const CustomPagination = ({ totalItems, itemsPerPage, onPageChange, currentPages }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(currentPages);

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
                    className={`circle d-flex align-items-center ml-2 ${i === currentPages ? 'active-page' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </div>
            );
        }
        return buttons;
    };

    return (
        <div className='mt-5'>
            <div>
                <span>Page {currentPages} of {totalPages}</span>
            </div>
            <div className='d-flex justify-content-center text-center mt-2'>
                <span className={`circle ${currentPages === 1 ? 'hide-button' : ''}`} onClick={() => handlePageChange(currentPage - 1)}>
                    <i className="fa fa-angle-left" aria-hidden="true" style={{ lineHeight: '30px', fontSize: 10 }}></i>
                </span>
                {renderPaginationButtons()}
                <span className={`circle ml-2  ${currentPages === totalPages ? 'hide-button' : ''}`} onClick={() => handlePageChange(currentPage + 1)}>
                    <i className="fa fa-angle-right" style={{ lineHeight: '30px', fontSize: 10 }} aria-hidden="true"></i>
                </span>
            </div>
        </div>
    );
};

export default CustomPagination;
