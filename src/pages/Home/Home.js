import React, { useEffect, useState } from 'react';
import ProductListing from '../../components/ProductListingComponents/ProductListingComponents';
import LeftSideBarComponents from '../../components/LeftSideBar/LeftSideBar';
import ProductServices from '../../services/ProductServices';

function HomeScreen() {
    const [page, setPage]= useState(1)
    const [defaultLimit, setDefaultLimit]= useState(20)
    const [category, setCategory]= useState("")
    const [searchText, setSearchText]= useState("")
    const [sortedField, setSortedField]= useState("")


    const [productsListData, setProductsListData] = useState();
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
   useEffect(()=>{
    getProductsList()
   },[])
   function getProductsList(){
    ProductServices.getAllProducts({page: page,
        limit: defaultLimit,
        category: category,
        title: searchText,
        price: sortedField,}).then((resp) => {
        if (resp?.status_code === 200) {
            setProductsListData(resp?.list?.data)
        }
    }).catch((error) => {
        console.log(error)
    })
   }
    return (
        <div className="" >
            <div className='m-2'>
            <div className="row">
            <div className="col-md-3 sidebar_hide">
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
              productsListData?.map((item, index) => {
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
