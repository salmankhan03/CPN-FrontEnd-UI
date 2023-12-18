import React, { useState } from 'react';

const ListComponents = ({ data, selectedData, handleDataChange,datatypes }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const handleToggleExpand = (itemId) => {
    setExpandedItems((prevExpanded) => {
      if (prevExpanded.includes(itemId)) {
        return prevExpanded.filter((id) => id !== itemId);
      } else {
        return [...prevExpanded, itemId];
      }
    });
  };

  const renderCategory = (category) => {
    const isExpanded = expandedItems.includes(category.id);

    return (
      <div key={category.id}>
        <div className='d-flex justify-content-between' onClick={() => handleToggleExpand(category.id)}>
          <label>
            <input
              type="checkbox"
              value={category.id}
              checked={selectedData.includes(category.id)}
              data-datatype={datatypes} 
              onChange={handleDataChange}
            />
            <span className='pl-2'>{category?.name}</span>
          </label>
          {category?.children?.length > 0 && (
            <span>
              <i className={`fa fa-angle-${isExpanded ? 'down' : 'right'}`}></i>
            </span>
          )}
        </div>
        {category?.children && isExpanded && (
          <div className='margin-left'>
            {category?.children.map((child) => renderCategory(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="product-category-sidebar">
      {data?.map((category) => renderCategory(category))}
    </div>
  );
};

export default ListComponents;
