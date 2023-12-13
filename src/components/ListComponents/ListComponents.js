// import React, { useState } from 'react';

// const ListComponents = ({ data, selectedData, handleDataChange }) => {
//   const [expandedItems, setExpandedItems] = useState([]);

//   const handleToggleExpand = (itemId) => {
//     setExpandedItems((prevExpanded) =>
//       prevExpanded.includes(itemId)
//         ? prevExpanded.filter((id) => id !== itemId)
//         : [...prevExpanded, itemId]
//     );
//   };

//   return (
//     <div className="product-category-sidebar">
//       {data?.map((item) => {
//         return (
//           <div key={item.id}>
//             <div className='d-flex justify-content-between'>
//               <label onClick={() => handleToggleExpand(item.id)}>
//                 <input
//                   type="checkbox"
//                   value={item.id}
//                   checked={selectedData.includes(item.id)}
//                   onChange={handleDataChange}
//                 />
//                 <span className='pl-2'>{item.name}</span>
//               </label>
//               {item.children.length > 0 && (
//                 <span>
//                   <i className="fa fa-angle-down"></i>
//                 </span>
//               )}
//             </div>
//             {item.children &&  (
//               <div className='ml-3'>
//                 {item.children.map((element) => (
//                   <div key={element.id}>
//                     <label>
//                       <input
//                         type="checkbox"
//                         value={element.id}
//                         checked={selectedData.includes(element.id)}
//                         onChange={handleDataChange}
//                       />
//                       <span className='pl-2'>{element.name}</span>
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ListComponents;
import React, { useState } from 'react';

const ListComponents = ({ data, selectedData, handleDataChange }) => {
const [expandedItems, setExpandedItems] = useState([]);

const handleToggleExpand = (itemId) => {
  setExpandedItems((prevExpanded) => {
    if (prevExpanded.includes(itemId)) {
      // If already expanded, collapse both parent and children
      return prevExpanded.filter((id) => id !== itemId);
    } else {
      // If not expanded, expand both parent and children
      return [...prevExpanded, itemId, ...getChildrenIds(itemId)];
    }
  });

};

const getChildrenIds = (parentId) => {
  const parent = data.find((item) => item.id === parentId);
  if (!parent || !parent.children) {
    return [];
  }

  const childrenIds = parent.children.map((child) => child.id);
  return parent.children.reduce(
    (ids, child) => [...ids, ...getChildrenIds(child.id)],
    childrenIds
  );
};

return (
  <div className="product-category-sidebar">
    {data?.map((item) => {
      const isExpanded = expandedItems.includes(item.id);

      return (
        <div key={item.id}>
          <div className='d-flex justify-content-between' onClick={() => handleToggleExpand(item.id)}>
            <label>
              <input
                type="checkbox"
                value={item.id}
                checked={expandedItems.includes(item.id)}
                onChange={handleDataChange}
              />
              <span className='pl-2'>{item.name}</span>
            </label>
            {item.children.length > 0 && (
              <span>
                <i className={`fa fa-angle-${isExpanded ? 'down' : 'right'}`}></i>
              </span>
            )}
          </div>
          {item.children && isExpanded && (
            <div className='ml-3'>
              {item.children.map((element) => (
                <div key={element.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={element.id}
                      checked={selectedData.includes(element.id)}
                      onChange={handleDataChange}
                    />
                    <span className='pl-2'>{element.name}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    })}
  </div>

  );
};

export default ListComponents;
