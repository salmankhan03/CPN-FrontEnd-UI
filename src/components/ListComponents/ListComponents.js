import React, { useState } from 'react';

const ListComponents = ({ data, selectedData, handleDataChange, datatypes, recordsDisplay}) => {
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
    const isExpanded = expandedItems?.includes(category.id);
    const isChecked = selectedData?.includes(category.id);

    return (
      <div key={category.id}>
        <div className='d-flex justify-content-between'>
          <label>
            <input
              type="checkbox"
              value={category.id}
              checked={isChecked}
              data-datatype={datatypes}
              onChange={handleDataChange}
            />
            <span className='pl-2'>{category?.name}</span>
          </label>
          {category?.children?.length > 0 && (
            <span onClick={() => handleToggleExpand(category.id)}>
              <i className={`fa fa-angle-${isExpanded ? 'down' : 'right'}`}></i>
            </span>
          )}
        </div>
        {category?.children && isExpanded && (
          <div className='margin-left'>
            {category?.children.slice(0, recordsDisplay).map((child) => renderCategory(child))}
          </div>
        )}
      </div>
    );
  };

  // const initialRender = data?.slice(0, visibleRecords).map((category) => renderCategory(category));
  const initialRender = data?.slice(0, recordsDisplay).map((category) => renderCategory(category));

  return (
    <div className="product-category-sidebar">
      {initialRender}
    </div>
  );
};

export default ListComponents;
