import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import InputComponent from '../InputComponents/InputComponents';

const RangeSliderInput = ({ min, max, values, filteredPrice, setFilteredPrice }) => {
    const [price, setPrice] = useState([])
    let timeoutId;

    useEffect(() => {
        setPrice(values);
    }, [values]);

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
        setPrice(newValues);
    }, 1000);
    const handleSliderChange = (values) => {
        handlePriceChange(values);
    };
    useEffect(() => {
        return () => clearTimeout(timeoutId);
    }, []);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilteredPrice((prevFilteredPrice) => {
                return price;
              });
        }, 1000);
        return () => clearTimeout(timeoutId);
      }, [price, filteredPrice, setFilteredPrice]);
    const customHandleInputChange = (e,type) => {
        const inputValue = parseFloat(e);
        if (!isNaN(inputValue)) {
            setPrice(prevPrice => {
                let newPrice = [...prevPrice];
                if (type === "min") {
                    newPrice[0] = inputValue;
                } else {
                    newPrice[1] = inputValue;
                }
                return newPrice;
            });
        }
    };


    return (
        <div className='m-1'>
            <>
                <Slider
                    min={min}
                    max={max}
                    range
                    step={1}
                    value={filteredPrice}
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
                                onChange={(e) => customHandleInputChange(e.target.value, "min")}
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
                                onChange={(e) => customHandleInputChange(e.target.value, "max")}
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

// import React, { useEffect, useState } from 'react';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import InputComponent from '../InputComponents/InputComponents';

// const RangeSliderInput = ({
//   min,
//   max,
//   values,
//   filteredPrice,
//   setFilteredPrice,
//   customeFilteredPrice,
//   setCustomeFilteredPrice
// }) => {
//   const [price, setPrice] = useState([]);
//     console.log(filteredPrice)
//   useEffect(() => {
//     setPrice([0,100000]);
//   }, [values]);

//   let timeoutId;

//   const debounce = (func, delay) => {
//     return function (...args) {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         func(...args);
//       }, delay);
//     };
//   };

//   const handlePriceChange = debounce((newValues) => {
//     setFilteredPrice(newValues);
//     setPrice(newValues);
//   }, 2500);

//   const handleSliderChange = (values) => {
//     handlePriceChange(values);
//   };

//   const handleInputChange = debounce((e, type) => {
//     const inputValue = parseFloat(e);
//     if (!isNaN(inputValue)) {
//       setPrice((prevPrice) => {
//         let newPrice = [...prevPrice];

//         if (type === 'min') {
//           newPrice[0] = inputValue;
//         } else {
//           newPrice[1] = inputValue;
//         }

//         setFilteredPrice(newPrice);
//         handleSliderChange(newPrice);

//         return newPrice;
//       });
//     }
//   }, 500, 'input');

//   return (
//     <div className='m-1'>
//       <>
//         <Slider
//           min={min}
//           max={max}
//           range
//           step={1}
//           value={filteredPrice}
//           onChange={handleSliderChange}
//         />
//         <div className='mt-1'>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <div className='m-2'>
//               <InputComponent
//                 type='number'
//                 id=''
//                 label=''
//                 customClass={`form-control gray-bg `}
//                 value={price[0]}
//                 onChange={(e) => handleInputChange(e.target.value, 'min')}
//                 placeholder='MinPrice'
//                 required
//               />
//             </div>
//             <div>
//               <div className='form-group' style={{ textAlign: 'center' }}>
//                 to
//               </div>
//             </div>
//             <div className='m-2'>
//               <InputComponent
//                 type='number'
//                 id='maxPrice'
//                 label=''
//                 customClass={`form-control gray-bg `}
//                 value={price[1]}
//                 onChange={(e) => handleInputChange(e.target.value, 'max')}
//                 placeholder='MaxPrice'
//                 required
//               />
//             </div>
//           </div>
//         </div>
//         <div className='mt-1'>
//           <div>
//             Price: {filteredPrice[0]} - {filteredPrice[1]}
//           </div>
//         </div>
//       </>
//     </div>
//   );
// };

// export default RangeSliderInput;
