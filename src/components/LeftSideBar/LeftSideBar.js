import React, { useState } from 'react';
import ListComponents from '../ListComponents/ListComponents';
import ButtonComponent from '../ButtonComponents/ButtonComponents';
import PriceFilter from '../PriceFilterComponents/PriceFilterComponents';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import RangeSliderInput from '../PriceFilterComponents/PriceFilterComponents';
function LeftSideBarComponents({ categoriesData, brandData, availabilityData, selectedCategories, setSelectedCategories,filteredPrice,setFilteredPrice }) {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const handleDataChange = (event) => {
    const categoryId = parseInt(event?.target?.value, 10);
    const updatedCategories = event.target.checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter(id => id !== categoryId);
    setSelectedCategories(updatedCategories);
  };

 

  const handleButtonClick = () => {
    // Your button click logic here
    console.log('Button clicked!');
  };
  return (
    <div >
      <div className="mt-2">
        <h4>Product Categories</h4>
        <ListComponents
          data={categoriesData}
          selectedData={selectedCategories}
          handleDataChange={handleDataChange}
        />
      </div>
      <div className='mt-3'>
        <h4>Filter by Price</h4>
        <RangeSliderInput min={0} max={100000} values={priceRange}  filteredPrice={filteredPrice} setFilteredPrice={setFilteredPrice}/>
      </div>
      {/* <div className="mt-2 mb-2">
              <ButtonComponent  onClick={handleButtonClick} label="Filter" />
            </div> */}
      {/* <div className="mt-2">
                <h4>Brands</h4>
                <ListComponents
                data={brandData}
                selectedData={selectedCategories}
                handleDataChange={handleDataChange}
                />
            </div>
            <div className="mt-2">
                <h4>Availability</h4>
                <ListComponents
                data={availabilityData}
                selectedData={selectedCategories}
                handleDataChange={handleDataChange}
                />
            </div> */}

    </div>
  );
}
export default LeftSideBarComponents;
