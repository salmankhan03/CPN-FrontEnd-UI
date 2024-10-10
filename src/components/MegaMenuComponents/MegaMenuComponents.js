import React from 'react';
import './MegaMenu.css';
import { useNavigate } from 'react-router-dom';

const RenderCategories = ({ categories, type, level = 0, onCategoryClick }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category, type) => {
    if (onCategoryClick) {
      onCategoryClick(category, type);
    }
    if (type === 'brand') {
      navigate(`/shop?name=brand&id=${category?.id}`);
    } else {
      navigate(`/shop?name=category&id=${category.id}`, { state: { selectedCategory: category.id } });
    }
  };

  return (
    <>
      {categories.map((category) => (
        <div className={`category-item ${level === 0 ? 'col-md-3 parent-category' : 'child-category'}`} key={category.id}>
          {/* style={{ paddingLeft: `${level * 10}px` }} */}
          <div >
            <span
              className={`category-name ${level === 0 ? 'parent-category-name' : 'child-category-name'}`}
              onClick={() => handleCategoryClick(category, type)}
            >
              {category.name}
            </span>

            {category.children && category.children.length > 0 && (
              <div className="child-categories">
                <RenderCategories categories={category.children} type={type} level={level + 1} onCategoryClick={onCategoryClick} />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

const MegaMenu = ({ isOpen, data, type, onMouseEnter, onMouseLeave }) => {
  return (
    <div className={`mega-menu ${isOpen ? 'open' : ''}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="mega-menu-content container">
        <div className="row">
          {data && <RenderCategories categories={data} type={type} />}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
