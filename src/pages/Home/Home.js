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
import { setBrandList } from '../../redux/action/brand-action';

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
    const [filteredPrice, setFilteredPrice] = useState([0, 0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState();
    const [selectedSortingOption, setSelectedSortingOption] = useState();
    const [maxPrice, setMaxPrice] = useState()



    const handlePageChange = (newPage) => {
        // Your logic to fetch and display data for the new page
        setCurrentPage(newPage);
    };


    useEffect(() => {
        console.log(selectedOption)
        getProductsList(selectedOption)

    }, [selectedOption])



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
        getPriceFilter()

    }, [])
    useEffect(() => {
        const getselectedBrands = brandData?.filter(brand => selectedBrands.includes(brand.id));
        const selectedBrandNames = getselectedBrands?.map(brand => brand.name);
        let data = {
            "category": selectedCategories,
            "brands": selectedBrandNames,
            // "price": filteredPrice[1] === null || filteredPrice[1] === undefined ? [0, JSON.parse(maxPrice)] :filteredPrice ,
            "price": filteredPrice[1] === null || filteredPrice[1] === undefined
                ? [0, maxPrice !== undefined ? JSON.parse(maxPrice) : 0]
                : filteredPrice,
        }
        console.log("FILterData", data)
            // (selectedCategories.length > 0 || selectedBrands.length > 0) && filteredPrice !== null
        if (data?.brands?.length > 0 || data?.category?.length > 0 || data?.price[1] !==  0 ) {
            getfilterWiseProduct(data)
            setProductsListData([])
        } else {
            setProductsListData([])
            getProductsList()
        }

    }, [selectedCategories, selectedBrands, filteredPrice])
    function getBrandList() {
        CategoryServices.getAllBrand({
            page: page,
            limit: defaultLimit,
        }).then((resp) => {
            setLoading(false)
            console.log(resp)
            if (resp?.status_code === 200) {
                console.log(resp.list.data)
                dispatch(setBrandList([
                    ...resp?.list?.data
                ]))
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
    function getfilterWiseProduct(data) {
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
    function getProductsList(limit) {
        console.log(limit)
        ProductServices.getAllProducts({
            page: page,
            limit: limit ? limit : defaultLimit,
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
    function getPriceFilter() {
        ProductServices.getMaximumPrice().then((resp) => {
            setLoading(false)
            if (resp?.status_code === 200) {
                const roundedMaxPrice = Math.ceil(parseFloat(152.88))
                setMaxPrice(roundedMaxPrice)
            }
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        })

    }
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleSortingChange = (e) => {
        setSelectedSortingOption(e.target.value);
    };

    return (
        <div className="" >
            <div className='m-2'>
                <div className="row mt-5">
                    <div className="col-md-3 sidebar_hide mt-2">
                        <div className='m-2'>
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
                                maximumPrice={maxPrice}
                            />
                        </div>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="row mb-5">
                            <div className="col-md-6 col-xs-4 mt-1">
                                <div>
                                    Showing all {productsListData?.length} results
                                    <span className='ml-2'>
                                        <select
                                            id="simpleDropdown"
                                            value={selectedOption}
                                            onChange={handleChange}
                                            className='select-dropdown'
                                        >
                                            <option value="12">12</option>
                                            <option value="24">24</option>
                                            <option value="36">36</option>
                                        </select>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6 col-8 mt-1 text-right text-center-sm">
                                <select
                                    id="sortingDropdown"
                                    value={selectedSortingOption}
                                    onChange={handleSortingChange}
                                    className='select-dropdown'
                                >
                                    <option value="default-sorting">Default sorting</option>
                                    <option value="sort-by-popularity">Sort by popularity</option>
                                    <option value="sort-by-average-rating">Sort by average rating</option>
                                    <option value="sort-by-latest">Sort by latest</option>
                                    <option value="sort-by-low-to-high">Sort by price: low to high</option>
                                    <option value="sort-by-high-to-low">Sort by price: high to low</option>
                                </select>
                            </div>
                        </div>
                        <div className="row m-1">
                            {productsListData?.length > 0 ? (
                                productsListData.map((item, index) => (
                                    <div className="col-lg-4 col-md-4 col-sm-6 mt-3" key={index} data-aos="zoom-in">
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
