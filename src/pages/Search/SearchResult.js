import React, { useEffect, useState } from 'react';
import ProductListing from '../../components/ProductListingComponents/ProductListingComponents';
import LeftSideBarComponents from '../../components/LeftSideBar/LeftSideBar';
import ProductServices from '../../services/ProductServices';
import { setProductList } from '../../redux/action/action';
import { useDispatch } from 'react-redux';
import NotFound from '../../components/NotFoundComponents/NotFoundComponents';
import Loadings from '../../components/LoadingComponents/LoadingComponents';
import CategoryServices from '../../services/categoryService';
import { setCategoryList } from '../../redux/action/category-action';
import CustomPagination from '../../components/PaginationComponents/Pagination';
import { setBrandList } from '../../redux/action/brand-action';
import { useLocation, useSearchParams } from 'react-router-dom';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useParams } from 'react-router-dom';
import SpinnerLoading from '../../components/SpinnerComponents/SpinnerLoader';
import { Offcanvas, Button } from 'react-bootstrap';
import Header from "../../components/HeaderComponents/HeaderComponents";

function SearchResults() {
    // const { type, id } = useParams();
    const location = useLocation();



    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [loader, setLoader] = useState(true)
    const [page, setPage] = useState(1)
    const [defaultLimit, setDefaultLimit] = useState(20)
    const [productDisplayLimit, setProductDisplayLimit] = useState()
    const [totalPages, setTotalPages] = useState()
    const [totalItems, setTotalItems] = useState()
    const [category, setCategory] = useState("")
    const [searchText, setSearchText] = useState("")
    const [sortedField, setSortedField] = useState("")
    const [productsListData, setProductsListData] = useState();
    const [products_List_loader, setProducts_List_loader] = useState(true);

    const [categoriesData, setCategoriesData] = useState();
    const [categories_Loader, setCategories_Loader] = useState(true);

    const [brandData, setBrandData] = useState();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [filteredPrice, setFilteredPrice] = useState([0, 0]);
    const [searchingText, setSearchingText] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState();
    const [selectedSortingOption, setSelectedSortingOption] = useState();
    const [maxPrice, setMaxPrice] = useState()
    const [show, setShow] = useState(false);
    const [filtersChanged, setFiltersChanged] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handlePageChange = (newPage) => {
        // Your logic to fetch and display data for the new page
        setCurrentPage(newPage);
    };


    useEffect(() => {
        getProductsList(selectedOption)
    }, [selectedOption, currentPage,location?.state?.searchingText])



    const [availabilityData, setAvailabilityData] = useState([
        { id: 4, name: 'exclude-from-catalog' },
        { id: 5, name: 'exclude-from-search' },
        { id: 6, name: 'featured' },
        { id: 7, name: 'outofstock' }
    ]);
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
        // SelectedCetegorySet
        // if (location?.state?.selectedCategory) {
        //     setTimeout(() => {
        //         setSelectedCategories(prevSelectedCategories => [
        //             ...prevSelectedCategories,
        //             location?.state?.selectedCategory
        //         ]);
        //     }, 2500);
        // }
        // if (location?.state?.sorting) {
        //     setSelectedSortingOption(location?.state?.sorting)
        // }

    }, [])
    // useEffect(() => {
    //     if (name === "category") {
    //         setSelectedCategories(prevSelectedCategories => [
    //             ...prevSelectedCategories,
    //             JSON.parse(id)
    //         ]);
    //     } else if (name === "brand") {
    //         setSelectedBrands(prevSelectedBrands => [
    //             ...prevSelectedBrands,
    //             JSON.parse(id)
    //         ]);
    //     } else if (name === "search") {
    //         const match = name.match(/search=([^&]*)/);
    //         const value = match ? match[1] : null;
    //         console.log(value); // Output: v2
    //         setSearchingText(value)
    //     }
    // }, [name, id])

    // useEffect(() => {
    //     if (!show) {
    //         const getSelectedBrands = brandData?.filter(brand => selectedBrands.includes(brand.id));
    //         const selectedBrandNames = getSelectedBrands?.map(brand => brand.name);
    //         let obj = {};
    //         switch (selectedSortingOption) {
    //             case "low":
    //                 obj.sort = { price: "asc" };
    //                 break;
    //             case "high":
    //                 obj.sort = { price: "desc" };
    //                 break;
    //             case "weekly_featured_products":
    //                 obj.sort = { "is_featured_updated_at": "DESC" };
    //                 break;
    //             case "new_products":
    //                 obj.sort = { "created_at": "DESC" };
    //                 break;
    //             case "products_on_sale":
    //                 obj.sort = { "sell_price_updated_at": "DESC" };
    //                 break;
    //             case "top_rated_products":
    //                 obj.sort = { "ratings_updated_at": "DESC" };
    //                 break;
    //             case "most_viewed_products":
    //                 obj.sort = { "visitors_counter": "DESC" };
    //                 break;
    //             default:
    //         }
    //         const uniqueArray = [...new Set(selectedCategories)];

    //         let data = {
    //             category: uniqueArray,
    //             brands: selectedBrandNames,
    //             price: filteredPrice[1] === null || filteredPrice[1] === undefined
    //                 ? [0, maxPrice !== undefined ? JSON.parse(maxPrice) : 0]
    //                 : filteredPrice,
    //             ...(Object.keys(obj).length !== 0 && { sort: obj.sort }),
    //         };
    //         // console.log("name 156",name)
    //         // const [key, value] = name?.split('=');
    //         // if (key === "search") {
    //         //     data['category'] = [];
    //         //     data['brands'] = [];
    //         //       data['title'] = value;
    //         // }
    //         if (data?.brands?.length > 0 || data?.category?.length > 0 || data?.price[1] !== 0) {
    //             // getfilterWiseProduct(data);           
    //             getProductsList();

    //             setProductsListData([]);
    //         } else {
    //             setProductsListData([]);
    //             getProductsList();
    //         }
    //         setFiltersChanged(false);
    //     }
    // }, [selectedCategories, selectedBrands, filteredPrice, selectedSortingOption, brandData, show]);

    useEffect(() => {
        const getselectedBrands = brandData?.filter(brand => selectedBrands.includes(brand.id));
        const selectedBrandNames = getselectedBrands?.map(brand => brand.name);
        let obj = {};
        if (selectedSortingOption) {
            obj.sort = { price: selectedSortingOption === "low" ? "asc" : "desc" };
        }
        let data = {
            "category": selectedCategories,
            "brands": selectedBrandNames,
            "price": filteredPrice[1] === null || filteredPrice[1] === undefined
                ? [0, maxPrice !== undefined ? JSON.parse(maxPrice) : 1000]
                : filteredPrice,
            ...(Object.keys(obj).length !== 0 && { sort: obj.sort }),
        }
        if (data?.brands?.length > 0 || data?.category?.length > 0 || (data?.price[0] !== 0 && data?.price[1] !== maxPrice) ) {
            getfilterWiseProduct(data);
            setProductsListData([]);
        } else {
            setProductsListData([]);
            getProductsList();
        }

    }, [selectedCategories, selectedBrands, filteredPrice, selectedSortingOption, selectedOption]);

    const fetchData = async () => {
        try {
            await Promise.all([
                // getProductsList(),
                getCategoryList(),
                getBrandList(),
                getPriceFilter(),
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoader(false)
        } finally {
            setLoader(false)

        }
    };
    function getBrandList() {
        CategoryServices.getAllBrand({
            page: page,
            limit: 100,
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
                const timers = setTimeout(() => {
                    setCategories_Loader(false)
                }, 1000);
                return () => clearTimeout(timers);
            }
        }).catch((error) => {
            // setLoading(false)
            setCategories_Loader(false)
            console.log(error)
        })
    }
    async function getfilterWiseProduct(data) {
        setProducts_List_loader(true)

        console.log('data-----------------------------', data)
        await ProductServices.getfilterWiseProducts(data).then((resp) => {
            if (resp?.status_code === 200) {

                console.log('resp?.list-------------------------', resp?.list)
                setProductsListData(resp?.list)
                setTotalItems(resp?.list?.length)
                setProductDisplayLimit(resp?.list?.length)
                setCurrentPage(1)
                setTimeout(() => {
                    setLoading(false)
                    setProducts_List_loader(false)
                }, 1000);
            }
            // setLoading(false)

        }).catch((error) => {
            setLoading(false)
            setProducts_List_loader(false)
            console.log(error)
        })


    }
    async function getProductsList() {
        console.log(location?.state?.searchingText)
        await ProductServices.getSearchResults(
            { searchParam: location?.state?.searchingText }).then((resp) => {
                if (resp?.status_code === 200) {
                    dispatch(setProductList({
                        ...resp?.list?.data
                    }))
                    setProductDisplayLimit(resp?.list?.per_page)
                    setProductsListData(resp?.list)
                    setTotalPages(resp?.list?.last_page)
                    setTotalItems(resp?.list?.total)
                    const timers = setTimeout(() => {
                        setLoading(false)
                        setProducts_List_loader(false)

                    }, 1000);
                    return () => clearTimeout(timers);
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
        setFiltersChanged(true);
    };
    const handleSortingChange = (e) => {
        setSelectedSortingOption(e?.target?.value ? e?.target?.value : e);
        setFiltersChanged(true);
    };
    console.log(selectedSortingOption)
    if (loader) {
        return <SpinnerLoading loading={loader} />
    }
    return (
        <>
            <Header />
            <div className="" >
                <div className="custom-container container">
                    <div style={{ display: 'flex' }} className={'sidebarMobile'}>
                        <i className="fa fa-bars d-lg-none" aria-hidden="true" style={{ color: '#000' }} onClick={handleShow}> Filter Product By Brand and Category</i>
                    </div>
                    <div className="row " style={{}}>
                        <div className="col-md-12 col-lg-3 sidebar_hide mt-4 ">
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
                                    categoryLoader={categories_Loader}

                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-9 marginTopBottom">
                            {products_List_loader ? (
                                <div className='d-flex justify-content-center mt-5'>
                                    <Loadings loading={products_List_loader} />
                                </div>
                            ) : (
                                <React.Fragment>
                                    <div className="row mb-5">
                                        <div className="col-md-6 col-xs-4 mt-1">
                                            <div className='d-flex align-items-center'>
                                                <p className='mt-3'>Showing all {productsListData?.length} results</p>
                                                <span className='ml-2'>
                                                    <select
                                                        id="simpleDropdown"
                                                        value={selectedOption}
                                                        onChange={handleChange}
                                                        className='select-dropdown h-auto box-height'
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
                                                className='select-dropdown h-auto box-height mt-2 text-center'
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
                                                <Loadings skNumber={15} />
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
                                                        {/* <CustomPagination totalItems={totalItems} itemsPerPage={productDisplayLimit} onPageChange={handlePageChange} currentPages={currentPage} /> */}
                                                    </div>
                                                </>
                                            ) : (
                                                <NotFound title="Sorry, There are no Products right now." />
                                            )
                                        )}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>


                        <Offcanvas show={show} onHide={handleClose} className="d-lg-none">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Filters</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
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
                                    categoryLoader={categories_Loader}
                                />
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                    <div className='pb-2'>
                        <FooterComponents />
                    </div>
                </div>
            </div>
        </>

    );
}

export default SearchResults;
