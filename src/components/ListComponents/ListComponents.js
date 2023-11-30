import React from 'react';

const ListComponents = ({ data, selectedData, handleDataChange }) => {
  return (
    <div className="product-category-sidebar">
      {data?.map(item => (
        <div key={item.id}>
          <label>
            <input
              type="checkbox"
              value={item.id}
              checked={selectedData.includes(item.id)}
              onChange={handleDataChange}
            />
            <span className='pl-2'>{item.name}</span>
            
          </label>
        </div>
      ))}
    </div>
  );
};

export default ListComponents;
