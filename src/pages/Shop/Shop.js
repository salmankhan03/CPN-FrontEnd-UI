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
import { useLocation, useSearchParams } from 'react-router-dom';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useParams } from 'react-router-dom';

function ShopScreen() {
    // const { type, id } = useParams();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const id = searchParams.get('id');
    console.log("params", name, id)


    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [defaultLimit, setDefaultLimit] = useState(20)
    const [productDisplayLimit, setProductDisplayLimit] = useState()
    const [totalPages, setTotalPages] = useState()
    const [totalItems, setTotalItems] = useState()
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
    const [selectedSortingOption, setSelectedSortingOption] = useState(location?.state?.sorting);
    const [maxPrice, setMaxPrice] = useState()



    const handlePageChange = (newPage) => {
        // Your logic to fetch and display data for the new page
        setCurrentPage(newPage);
    };


    useEffect(() => {
        getProductsList(selectedOption)

    }, [selectedOption, currentPage])



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
        if (location?.state?.selectedCategory) {
            setTimeout(() => {
                setSelectedCategories(prevSelectedCategories => [
                    ...prevSelectedCategories,
                    location?.state?.selectedCategory
                ]);
            }, 2500);
        }
        if (location?.state?.sorting) {
            setSelectedSortingOption(location?.state?.sorting)
        }

    }, [])
    useEffect(() => {
        if (name === "category") {
            setSelectedCategories(prevSelectedCategories => [
                ...prevSelectedCategories,
                JSON.parse(id)
            ]);
        } else if (name === "brand") {
            setSelectedBrands(prevSelectedBrands => [
                ...prevSelectedBrands,
                JSON.parse(id)
            ]);
        }
    }, [name, id])
    useEffect(() => {
        const getselectedBrands = brandData?.filter(brand => selectedBrands.includes(brand.id));
        const selectedBrandNames = getselectedBrands?.map(brand => brand.name);
        let obj = {};
        switch (selectedSortingOption) {
            case "low":
                obj.sort = { price: "asc" };
                break;
            case "high":
                obj.sort = { price: "desc" };
                break;
            case "weekly_featured_products":
                obj.sort = { "is_featured_updated_at": "DESC" };
                break;
            case "new_products":
                obj.sort = { "created_at": "DESC" };
                break;
            case "products_on_sale":
                obj.sort = { "sell_price_updated_at": "DESC" };
                break;
            case "top_rated_products":
                obj.sort = { "ratings_updated_at": "DESC" };
                break;
            case "most_viewed_products":
                obj.sort = { "visitors_counter": "DESC" };
                break;
            default:
            // Handle default case if needed
        }
        console.log("selectedCategories",selectedCategories)
        const uniqueArray = [...new Set(selectedCategories)];

        let data = {
            "category": uniqueArray,
            "brands": selectedBrandNames,
                "price": filteredPrice[1] === null || filteredPrice[1] === undefined
                ? [0, maxPrice !== undefined ? JSON.parse(maxPrice) : 0]
                : filteredPrice,
            ...(Object.keys(obj).length !== 0 && { sort: obj.sort }),
        }
       
        console.log("DATA", data)
        // (selectedCategories.length > 0 || selectedBrands.length > 0) && filteredPrice !== null
            if (data?.brands?.length > 0 || data?.category?.length > 0 || data?.price[1] !== 0) {
                getfilterWiseProduct(data)
                setProductsListData([])
            } else {
                setProductsListData([])
                getProductsList()
            }

    }, [selectedCategories, selectedBrands, filteredPrice, selectedSortingOption,])
    function getBrandList() {
        CategoryServices.getAllBrand({
            page: page,
            limit: defaultLimit,
        }).then((resp) => {
            // setLoading(false)
            // console.log(resp)
            if (resp?.status_code === 200) {
                // console.log(resp.list.data)
                dispatch(setBrandList([
                    ...resp?.list?.data
                ]))
                setBrandData(resp?.list?.data)
            }
        }).catch((error) => {
            // setLoading(false)
            console.log(error)
        })

    }

    function getCategoryList() {
        CategoryServices.getAllCategory({
            page: page,
            limit: defaultLimit,
        }).then((resp) => {
            // setLoading(false)
            // console.log(resp)
            if (resp?.status_code === 200) {
                dispatch(setCategoryList([
                    ...resp?.tree?.data
                ]))
                setCategoriesData(resp?.tree?.data)
            }
        }).catch((error) => {
            // setLoading(false)
            console.log(error)
        })
    }
    async function getfilterWiseProduct(data) {
        setLoading(true)
        await ProductServices.getfilterWiseProducts(data).then((resp) => {
            if (resp?.status_code === 200) {
                // console.log(resp)
                // dispatch(setProductList({
                //     ...resp?.list?.data
                // }))
                setProductsListData(resp?.list)
                setTotalItems(resp?.list?.length)
                setProductDisplayLimit(resp?.list?.length)
                setCurrentPage(1)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
            // setLoading(false)

        }).catch((error) => {
            setLoading(false)
            console.log(error)
        })


    }
    async function getProductsList(limit) {
        // console.log(limit)
        await ProductServices.getAllProducts({
            page: currentPage ? currentPage : page,
            limit: limit ? limit : defaultLimit,
        }).then((resp) => {
            if (resp?.status_code === 200) {
                dispatch(setProductList({
                    ...resp?.list?.data
                }))
                setProductDisplayLimit(resp?.list?.per_page)
                setProductsListData(resp?.list?.data)
                setTotalPages(resp?.list?.last_page)
                setTotalItems(resp?.list?.total)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        })
    }
    function getPriceFilter() {
        ProductServices.getMaximumPrice().then((resp) => {
            // setLoading(false)
            if (resp?.status_code === 200) {
                const roundedMaxPrice = Math.ceil(parseFloat(resp?.max_price))
                setMaxPrice(roundedMaxPrice)
            }
        }).catch((error) => {
            // setLoading(false)
            console.log(error)
        })
    }
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        setCurrentPage(1)
    };
    const handleSortingChange = (e) => {
        setSelectedSortingOption(e?.target?.value ? e?.target?.value : e);
    };
    console.log(selectedSortingOption)
    return (
        <div className="" >
            <div className="custom-container">
                <div className="row mt-3" style={{}}>
                    <div className="col-md-12 col-lg-3 sidebar_hide mt-2 ">
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
                    <div className="col-md-12 col-lg-9 mt-2">
                        <div className="row mb-5">
                            <div className="col-md-6 col-xs-4 mt-1">
                                <div className='d-flex align-items-center'>
                                    <p className='mt-3'>Showing all {productsListData?.length} results</p>
                                    <span className='ml-2'>
                                        <select
                                            id="simpleDropdown"
                                            value={selectedOption}
                                            onChange={handleChange}
                                            className='select-dropdown'
                                        ><option defaultValue={20} >20</option>
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
                                    defaultValue={selectedSortingOption}
                                    onChange={handleSortingChange}
                                    className='select-dropdown'
                                >
                                    <option value="low">Sort by price: low to high</option>
                                    <option value="high">Sort by price: high to low</option>
                                    <option value="weekly_featured_products">Weekly Featured Products</option>
                                    <option value="new_products">New Products</option>
                                    <option value="products_on_sale">Products On Sale</option>
                                    <option value="top_rated_products">Top Rated Products</option>
                                    <option value="most_viewed_products">Most Viewed Products</option>
                                </select>
                            </div>
                        </div>
                        <div className="row m-1">
                            {loading ? (
                                <div>
                                    <Loading skNumber={15} />
                                </div>
                            ) : (
                                productsListData?.length > 0 ? (
                                    <>
                                        {productsListData.map((item, index) => (
                                            <div className="col-lg-4 col-md-6 col-sm-6 mt-3" key={index} data-aos="zoom-in">
                                                <ProductListing productItem={item} />
                                            </div>

                                        ))}
                                        <div className='row text-center'>
                                            <CustomPagination totalItems={totalItems} itemsPerPage={productDisplayLimit} onPageChange={handlePageChange} currentPages={currentPage} />
                                        </div>
                                    </>
                                ) : (
                                    <NotFound title="Sorry, There are no Products right now." />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <FooterComponents />
                {/* <Header/> */}
            </div>
        </div>

    );
}

export default ShopScreen;
