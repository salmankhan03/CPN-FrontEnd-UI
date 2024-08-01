import React from 'react';
import './MegaMenu.css';
import { useNavigate } from 'react-router-dom';

const RenderCategories = ({ categories, type, isTopLevel = true, onCategoryClick }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category,type) => {
    if (onCategoryClick) {
       onCategoryClick(category,type);
    }
    if (type === 'brand') {
      navigate(`/shop?name=brand&id=${category?.id}`)
    } else {
      navigate(`/shop?name=category&id=${category.id}`, { state: { selectedCategory: category.id } });
    }
  };

  return categories.map((category) => (
    <div className="column col-md-3" key={category.id}>
      {type === 'brand' ? (
        <p className='text-black' onClick={() => handleCategoryClick(category,type)}>{category.name}</p>
      ) : (
        isTopLevel ? <strong className='text-black' onClick={() => handleCategoryClick(category,type)}>{category.name}</strong> : <p className='text-black' onClick={() => handleCategoryClick(category,type)}>{category.name}</p>
      )}
      {category.children && category.children.length > 0 && (
        <div className="children">
          <RenderCategories categories={category.children} type={type} isTopLevel={false} onCategoryClick={onCategoryClick} />
        </div>
      )}
    </div>
  ));
};

const MegaMenu = ({ isOpen, data, type, onMouseEnter, onMouseLeave }) => {
  return (
    <div className={`mega-menu ${isOpen ? 'open' : ''}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="mega-menu-content container">
        <div className="row">
          {data && <RenderCategories categories={data} type={type} isTopLevel={true} />}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
