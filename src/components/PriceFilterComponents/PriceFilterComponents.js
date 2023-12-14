import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import InputComponent from '../InputComponents/InputComponents';

const RangeSliderInput = ({ min, max, values, filteredPrice, setFilteredPrice,customeFilteredPrice,setCustomeFilteredPrice }) => {
    const [price, setPrice] = useState([])
    let timeoutId; 

    const debounce = (func, delay) => {
        return function (...args) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func(...args);
          }, delay);
        };
      };
    
      const handlePriceChange = debounce((newValues) => {
        console.log(newValues);
        setFilteredPrice(newValues);
      }, 2500);
      const handleSliderChange = (values) => {
        handlePriceChange(values);
      };
    
      useEffect(() => {
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
      }, []);

    const handleInputChange = (e, type) => {

        const inputValue = parseFloat(e);
            if (!isNaN(inputValue)) {
                setPrice(prevPrice => {
                let newPrice = [...prevPrice];

                if (type === "min") {
                    newPrice[0] = inputValue;
                } else {
                    newPrice[1] = inputValue;
                }
                setCustomeFilteredPrice(newPrice)

                return newPrice;
                });
            }
    }
    // const handlePriceChange = (newValues) => {
    //     console.log(newValues)
    //     setTimeout(()=>{
    //         setFilteredPrice(newValues)

    //     },2500)
    // };
    return (
        <div className='m-1'>
            <>
                <Slider
                    min={min}
                    max={max}
                    range
                    step={1}
                    defaultValue={values}
                    onChange={handleSliderChange}
                />
                <div className='mt-1'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className='m-2'>
                            <InputComponent
                                type="number"
                                id=""
                                label=""
                                customClass={`form-control gray-bg `}
                                value={price[0]}
                                onChange={(e) => handleInputChange(e.target.value,"min")}
                                placeholder="MinPrice"
                                required
                            />
                        </div>
                        <div>
                            <div className='form-group' style={{ textAlign: 'center' }}>
                                to
                            </div>
                        </div>
                        <div className='m-2'>
                            <InputComponent
                                type="number"
                                id="maxPrice"
                                label=""
                                customClass={`form-control gray-bg `}
                                value={price[1]}
                                onChange={(e) => handleInputChange(e.target.value, "max")}
                                placeholder="MaxPrice"
                                required
                            />
                        </div>
                    </div>

                </div>
                <div className='mt-1'>
                    <div>
                        Price: {filteredPrice[0]} - {filteredPrice[1]}
                    </div>

                </div>
            </>
        </div>
    );
};

export default RangeSliderInput;
