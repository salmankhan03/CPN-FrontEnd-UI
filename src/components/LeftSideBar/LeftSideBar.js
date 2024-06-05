import React, { useState } from 'react';
import ListComponents from '../ListComponents/ListComponents';
import ButtonComponent from '../ButtonComponents/ButtonComponents';
import PriceFilter from '../PriceFilterComponents/PriceFilterComponents';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import RangeSliderInput from '../PriceFilterComponents/PriceFilterComponents';
import InputComponent from '../InputComponents/InputComponents';
function LeftSideBarComponents({ categoriesData, brandData, availabilityData, selectedCategories, setSelectedCategories, selectedBrands, setSelectedBrands, filteredPrice, setFilteredPrice, maximumPrice }) {
  const [priceRange, setPriceRange] = useState([0, maximumPrice]);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [brandSearchTerm, setBrandSearchTerm] = useState('');
  const [visibleRecords, setVisibleRecords] = useState(5); 
  const [visibleBrandRecords, setVisibleBrandRecords] = useState(5);


  const handleDataChange = (event) => {
    const dataType = event.target.dataset.datatype; // Access the 'datatypes' attribute
    const categoryId = parseInt(event?.target?.value, 10);

    if (dataType === "Category") {
      handleCategoryChange(categoryId, event.target.checked);
    } else {
      const brandId = parseInt(event?.target?.value, 10);
      const updatedBrand = event.target.checked
        ? [...selectedBrands, brandId]
        : selectedBrands.filter(id => id !== brandId);
      setSelectedBrands(updatedBrand);
    }
  };
  const handleCategoryChange = (categoryId, isChecked) => {
    let newSelectedCategories = [...selectedCategories];

    const updateChildCategories = (category, isChecked) => {
      category.children?.forEach(child => {
        if (isChecked) {
          if (!newSelectedCategories.includes(child.id)) {
            newSelectedCategories.push(child.id);
          }
        } else {
          newSelectedCategories = newSelectedCategories.filter(id => id !== child.id);
        }
        updateChildCategories(child, isChecked);
      });
    };

    if (isChecked) {
      newSelectedCategories.push(categoryId);
      const category = findCategoryById(filteredCategories, categoryId);
      if (category) {
        updateChildCategories(category, true);
      }
    } else {
      newSelectedCategories = newSelectedCategories.filter(id => id !== categoryId);
      const category = findCategoryById(filteredCategories, categoryId);
      if (category) {
        updateChildCategories(category, false);
      }
    }

    setSelectedCategories(newSelectedCategories);
  };

  const findCategoryById = (categories, id) => {
    for (const category of categories) {
      if (category.id === id) {
        return category;
      }
      if (category.children) {
        const found = findCategoryById(category.children, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };
  const filteredCategories = categoriesData?.filter(category =>
    category.name?.toLowerCase()?.includes(categorySearchTerm?.toLowerCase())
  );
  const filteredBrands = brandData?.filter(category =>
    category.name?.toLowerCase()?.includes(brandSearchTerm?.toLowerCase())
  );

  const handleSearchCategory = (event) => {
    console.log(event)
    setCategorySearchTerm(event.target.value);
  };
  const handleSearchBrand = (event) => {
    console.log(event)
    setBrandSearchTerm(event.target.value);
  };
  const handleClearSearch = () => {
    setCategorySearchTerm('');
  };
  const handleClearBrand = () => {
    setBrandSearchTerm('');
  };

  const handleLoadMore = () => {
    setVisibleRecords((prevVisible) => prevVisible + 5); // Increase visible records by 5
  };

  
  const handleViewLess = () => {
    setVisibleRecords((prevVisible) => Math.max(5, prevVisible - 5)); // Decrease visible records by 5, minimum 5
  };
  const handleLoadMoreBrands = () => {
    setVisibleBrandRecords((prevVisible) => prevVisible + 5); 
    console.log("visibleBrandRecords",visibleBrandRecords)
    console.log("filteredBrands?.length",filteredBrands?.length)
  };
  const handleViewLessBrands = () => {
    setVisibleBrandRecords((prevVisible) => Math.max(5, prevVisible - 5)); // Decrease visible records by 5, minimum 5
  };
  return (
    <div >
      <div className="m-3">
        <h4 className="d-flex justify-content-between align-items-center">
          Categories
          <span className="load-more-span">
            <div className="load-more-container pt-0 mt-0">
              {categoriesData?.length > visibleRecords && (
                <button className="load-more-button btn btn-sm " onClick={handleLoadMore}>View More</button>
              )}
               {visibleRecords > 5 && (
                <button className="load-more-button btn btn-sm" onClick={handleViewLess}>View Less</button>
              )}
            </div>
          </span>
        </h4>
        <div className='mt-4'>
          <div className='mb-3 position-relative '>
            <InputComponent
              type="text"
              id="searchCategories"
              customClass={`form-control gray-bg `}
              value={categorySearchTerm}
              onChange={handleSearchCategory}
              placeholder="Search categories..."
            />
            {categorySearchTerm && (
              <div className="position-absolute top-0 end-0 translate-middle-y"
                style={{ marginTop: 20, marginRight: 10 }}
                onClick={handleClearSearch}>
                <i className="fas fa-times"></i>
              </div>
            )}
          </div>
          <div className='mt-3' style={{ maxHeight: 280, overflow: 'auto' }}>
            <ListComponents
              data={filteredCategories}
              selectedData={selectedCategories}
              handleDataChange={handleDataChange}
              datatypes="Category"
              recordsDisplay={visibleRecords}
            />
          </div>
        </div>
      </div>
      <div className='m-3 mt-2'>
        <h4>Filter by Price</h4>
        <div className='mt-4 m-2'>
          <RangeSliderInput min={0} max={maximumPrice} values={priceRange} filteredPrice={filteredPrice} setFilteredPrice={setFilteredPrice} />
        </div>
      </div>
      <div className="m-3">
        <h4 className="d-flex justify-content-between align-items-center">Brands
        <span className="load-more-span">
            <div className="load-more-container pt-0 mt-0">
              {filteredBrands?.length >= visibleBrandRecords  ? (
                <button className="load-more-button btn btn-sm " onClick={handleLoadMoreBrands}>View More</button>
              ):(
                <button className="load-more-button btn btn-sm" onClick={handleViewLessBrands}>View Less</button>
              )}
            </div>
          </span>
        </h4>
        <div className='mt-4'>
          <div className='mb-3 position-relative'>
            <InputComponent
              type="text"
              id="searchCategories"
              customClass={`form-control gray-bg`}
              value={brandSearchTerm}
              onChange={handleSearchBrand}
              placeholder="Search Brands..."
            />
            {brandSearchTerm && (
              <div className="position-absolute top-0 end-0 translate-middle-y"
                style={{ marginTop: 20, marginRight: 10 }}
                onClick={handleClearBrand}>
                <i className="fas fa-times"></i>
              </div>
            )}
          </div>
          <div className='mt-3' style={{ height: 250, overflow: 'auto' }}>
            <ListComponents
              data={filteredBrands}
              selectedData={selectedBrands}
              handleDataChange={handleDataChange}
              datatypes="Brand"
              recordsDisplay={visibleBrandRecords}
            />
          </div>
        </div>
      </div>
      {/*  <div className="mt-2">
                <h4>Availability</h4>
                <ListComponents
                data={availabilityData}
                selectedData={selectedCategories}
                handleDataChange={handleDataChange}
                />
            </div> */}

    </div >
  );
}
export default LeftSideBarComponents;
