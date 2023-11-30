import React, { useState } from 'react';
import ListComponents from '../ListComponents/ListComponents';
import ButtonComponent from '../ButtonComponents/ButtonComponents';

function LeftSideBarComponents({ categoriesData,brandData,availabilityData }) {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleDataChange = (event) => {
      const categoryId = parseInt(event.target.value, 10);
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
            {/* <div className="mt-2 mb-2">
              <ButtonComponent  onClick={handleButtonClick} label="Filter" />
            </div> */}
            <div className="mt-2">
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
            </div>

        </div>
      );
    }  
export default LeftSideBarComponents;
