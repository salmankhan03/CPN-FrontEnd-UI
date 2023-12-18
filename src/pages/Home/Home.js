import React, { useEffect, useState } from 'react';
import ProductListing from '../../components/ProductListingComponents/ProductListingComponents';
import LeftSideBarComponents from '../../components/LeftSideBar/LeftSideBar';
import ProductServices from '../../services/ProductServices';
import { setProductList } from '../../redux/action/action';
import { useDispatch } from 'react-redux';
import NotFound from '../../components/NotFoundComponents/NotFoundComponents';
import Loading from '../../components/LoadingComponents/LoadingComponents';
import CategoryServices from '../../services/categoryService';
import { setCategoryList } from '../../redux/action/category-action';
import CustomPagination from '../../components/PaginationComponents/Pagination';

function HomeScreen() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [defaultLimit, setDefaultLimit] = useState(20)
    const [productDisplayLimit, setProductDisplayLimit] = useState(12)
    const [totalPages, setTotalPages] = useState(12)
    const [category, setCategory] = useState("")
    const [searchText, setSearchText] = useState("")
    const [sortedField, setSortedField] = useState("")
    const [productsListData, setProductsListData] = useState();
    const [categoriesData, setCategoriesData] = useState();
    const [brandData, setBrandData] = useState();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [filteredPrice, setFilteredPrice] = useState([0, 100000]);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
      // Your logic to fetch and display data for the new page
      setCurrentPage(newPage);
    };


    



    const [availabilityData, setAvailabilityData] = useState([
        { id: 4, name: 'exclude-from-catalog' },
        { id: 5, name: 'exclude-from-search' },
        { id: 6, name: 'featured' },
        { id: 7, name: 'outofstock' }
    ]);
    useEffect(() => {
        getProductsList()
        getCategoryList()
        getBrandList()

    }, [])
    useEffect(()=>{
        let data ={
            "category": selectedCategories,
            "price": filteredPrice,
            "brands" :selectedBrands
        }

        if(selectedCategories.length > 0 ||selectedBrands.length > 0 || filteredPrice ){
            getfilterWiseProduct(data)
            setProductsListData([])
        }else{
            setProductsListData([])
            getProductsList()
        }
        
    },[selectedCategories, selectedBrands,filteredPrice])
    function getBrandList(){
        CategoryServices.getAllBrand({
            page: page,
            limit: defaultLimit,
        }).then((resp) => {
            setLoading(false)
            console.log(resp)
            if (resp?.status_code === 200) {
                console.log(resp.list.data)
                setBrandData(resp?.list?.data)
            }
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        })

    }

    function getCategoryList() {
        CategoryServices.getAllCategory({
            page: page,
            limit: defaultLimit,
        }).then((resp) => {
            setLoading(false)
            console.log(resp)
            if (resp?.status_code === 200) {
                dispatch(setCategoryList([
                    ...resp?.tree?.data
                ]))
                setCategoriesData(resp?.tree?.data)
            }
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        })
    }
    function getfilterWiseProduct(data){
        setLoading(true)
        ProductServices.getfilterWiseProducts(data).then((resp) => {
            setLoading(false)
            if (resp?.status_code === 200) {
                console.log(resp)
                // dispatch(setProductList({
                //     ...resp?.list?.data
                // }))
                setProductsListData(resp?.list)
            }
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        })
        

    }
    function getProductsList() {
        ProductServices.getAllProducts({
            page: page,
            limit: defaultLimit,
            category: category,
            title: searchText,
            price: sortedField,
        }).then((resp) => {
            setLoading(false)
            if (resp?.status_code === 200) {
                dispatch(setProductList({
                    ...resp?.list?.data
                }))
                setProductsListData(resp?.list?.data)
                setTotalPages(resp?.list?.last_page)
            }
        }).catch((error) => {
            setLoading(false)
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
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                                selectedBrands={selectedBrands}
                                setSelectedBrands={setSelectedBrands}
                                filteredPrice={filteredPrice}
                                setFilteredPrice={setFilteredPrice}
                            />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {productsListData?.length > 0 ? (
                                productsListData.map((item, index) => (
                                    <div className="col-lg-4 col-md-4 col-sm-6" key={index} data-aos="zoom-in">
                                        <ProductListing productItem={item} />
                                    </div>
                                ))
                            ) : (
                                loading ? (
                                    <div>  
                                        <Loading skNumber={15} />
                                    </div>
                                ) : <NotFound title="Sorry, There are no Products right now." />
                            )}
                        </div>
                        <div className='row text-center'>
                            <CustomPagination totalItems={totalPages} itemsPerPage={productDisplayLimit} onPageChange={handlePageChange} />
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default HomeScreen;
