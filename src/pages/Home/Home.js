import React, { useState } from 'react';
import ProductListing from '../../components/ProductListingComponents/ProductListingComponents';
import LeftSideBarComponents from '../../components/LeftSideBar/LeftSideBar';

function HomeScreen() {
    const [productsListData, setProductsListData] = useState([
    {
        id :"sda214541hhgsda",
        imagePath:"https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
        title:"Centrum OstoCalcium Total Chewables (60s)",
        price:"35",
        rating:4.5
    },
    {
        id :"trerwfdfvgds",
        imagePath:"https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
        title:"Produt2",
        price:"35",
        rating:3
    },
    {
        id :"6545987bjfdvfbghgsda",
        imagePath:"https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
        title:"Produt3",
        price:"35",
        rating:4
    },
    {
        id :"sda214541hhgsewrewrwetre",
        imagePath:"https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
        title:"Produt4",
        price:"35",
        rating:4
    },
    {
        id :"sasfuyewbda214541hhgsda",
        imagePath:"https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
        title:"Produt5",
        price:"35",
        rating:4
    },
    {
        id :"sda21455454654541hhgsda",
        imagePath:"https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
        title:"Produt6",
        price:"35",
        rating:4
    },
    {
        id :"trerghjdsif32656",
        imagePath:"https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
        title:"Produt7",
        price:"35",
        rating:4
    },
    {
        id :"aassda21455454654541hhgsda",
        imagePath:"https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
        title:"Produt8",
        price:"35",
        rating:4
    },
    {
        id :"trerghjdsif326512546",
        imagePath:"https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
        title:"Produt9",
        price:"35",
        rating:4
    },
    
]);
const [categoriesData, setCategoriesData] = useState([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Home and Furniture' },
  ]);
  const [brandData, setBrandData] = useState([
    { id: 10, name: 'Brand 1' },
    { id: 12, name: 'Brand 2' },
    { id: 13, name: 'Brand 3' },
    { id: 14, name: 'Brand 4' },
    { id: 15, name: 'Brand 5' },
    { id: 16, name: 'Brand 6' },
  ]);
  const [availabilityData, setAvailabilityData] = useState([
    { id: 4, name: 'exclude-from-catalog' },
    { id: 5, name: 'exclude-from-search' },
    { id: 6, name: 'featured' },
    { id: 7, name: 'outofstock' }
  ]);
    return (
        <div className="" >
            <div className='m-2'>
            <div className="row">
            <div className="col-md-3">
                <div className='m-1'>
                    <LeftSideBarComponents 
                        categoriesData={categoriesData} 
                        brandData={brandData}
                        availabilityData={availabilityData}
                    />
                </div>
            </div>
            <div className="col-md-9">
            <div className="row">
            {productsListData &&
              productsListData.map((item, index) => {
                return (
                    <div className="col-lg-4 col-md-4 col-sm-6" key={index} data-aos="zoom-in">
                        <ProductListing
                        productItem={item}
                        />
                    </div>
                );
              })}
          </div>
            </div>

            </div>
        </div>
        </div>
        
    );
}

export default HomeScreen;
