import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
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
import { useLocation } from 'react-router-dom';
import ListComponents from '../../components/ListComponents/ListComponents';

function CategoryPage() {

    const location = useLocation();
    const dispatch = useDispatch();
    const [productsListData, setProductsListData] = useState();
    const [categoriesData, setCategoriesData] = useState();
    const [brandData, setBrandData] = useState();
    const { categoryId } = useParams();
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [filteredPrice, setFilteredPrice] = useState([0, 0]);
    const [selectedOption, setSelectedOption] = useState();
    const [selectedSortingOption, setSelectedSortingOption] = useState(location?.state?.sorting);
    const [maxPrice, setMaxPrice] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState()
    const [productDisplayLimit, setProductDisplayLimit] = useState()
    const [id, setId] = useState()

    useEffect(() => {
        const ids = getIdFromUrl(location.pathname);
        console.log(ids)
        setId(ids);
    }, [location]);
    useEffect(() => {

        let data = {
            "category": [id],
            "brands": [],
            "price": [0, 100],
        }
        console.log("DATA", data)
        getfilterWiseProduct(data)

    }, [id]);
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
    function getIdFromUrl(url) {
        const segments = url.split('/:');
        return segments[segments.length - 1] || null;
    }
    const handlePageChange = (newPage) => {
        // Your logic to fetch and display data for the new page
        setCurrentPage(newPage);
    };
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        setCurrentPage(1)
    };
    const handleSortingChange = (e) => {
        setSelectedSortingOption(e?.target?.value ? e?.target?.value : e);
    };

    return (
        <div className="" >
            <div className="custom-container">
                <div className="row mt-3" style={{}}>
                    {/* <div className="col-md-12 col-lg-3 sidebar_hide mt-2 ">
                        <div className="m-3">
                            <h4 className="sidebar-filter-section pointer-on-hover">Product Categories</h4>
                            <div className='mt-4'>
                                <ListComponents
                                    data={categoriesData}
                                    selectedData={selectedCategories}
                                    handleDataChange={""}
                                    datatypes="Category"
                                />
                            </div>
                        </div>
                    </div> */}
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

export default CategoryPage;
