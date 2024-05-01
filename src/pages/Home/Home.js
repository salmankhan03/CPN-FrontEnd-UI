import React, { useEffect, useRef, useState } from 'react';
import banner1 from "../../assets/images/banner/banner1.jpg";
import banner2 from "../../assets/images/banner/banner2.jpg";
import banner3 from "../../assets/images/banner/banner3.jpg";
import ImageComponent from '../../components/ImageComponents/ImageComponents';
import { useDispatch, useSelector } from 'react-redux';
import { notifySuccess } from "../../components/ToastComponents/ToastComponents";
import { addtoCartItems } from '../../redux/action/cart-action';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useNavigate } from 'react-router-dom';
import { setCategoryList } from '../../redux/action/category-action';
import CategoryServices from '../../services/categoryService';
import ProductServices from '../../services/ProductServices';
import SliderComponents from '../../components/SliderComponents/SliderComponents';


function HomeScreen() {
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [page, setPage] = useState(1)
    const [defaultLimit, setDefaultLimit] = useState(20)
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const dispatch = useDispatch();
    const [categoriesData, setCategoriesData] = useState();
    const [weeklyProductsList, setWeeklyProductsList] = useState()
    const [customProductsData, setCustomProductsData] = useState()

    const scrollContainerRef = useRef(null);
    const [cardsPerRow, setCardsPerRow] = useState(3);

    const banners = [
        { id: 1, src: banner1, alt: 'Banner 1' },
        { id: 2, src: banner2, alt: 'Banner 3' },
        { id: 3, src: banner3, alt: 'Banner 3' },
    ];
    useEffect(() => {
        getCategoryList()
        getCategoryWiseWeeklyProducts()
        getCustomProductsList()
        // getBrandList()
        // getPriceFilter()

        const updateCardsPerRow = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1441) {
                setCardsPerRow(4);
            }
            else if (screenWidth >= 1024) {
                setCardsPerRow(3);
            } else if (screenWidth >= 768) {
                setCardsPerRow(2);
            } else {
                setCardsPerRow(1);
            }
        };

        updateCardsPerRow();
        window.addEventListener('resize', updateCardsPerRow);

        return () => {
            window.removeEventListener('resize', updateCardsPerRow);
        };
    },[]);

    // Cards


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
    function getCategoryWiseWeeklyProducts(data) {
        ProductServices.getWeeklyProducts({
            page: page,
            limit: defaultLimit,
            category: data ? data : ''
        }).then((resp) => {
            if (resp?.status_code === 200) {
                setWeeklyProductsList(resp?.list)
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    async function getCustomProductsList() {
        await ProductServices.getDashboardProductslist().then((resp) => {
            if (resp?.status_code === 200) {
                console.log(resp)
                setCustomProductsData(resp?.list)
            }
        }).catch((error) => {

            console.log(error)
        })


    }
    const handleItemClick = (id) => {
        setSelectedCategories(id);
        getCategoryWiseWeeklyProducts(id)
    };
    const truncateString = (str, maxLength) => {
        if (str?.length <= maxLength) return str;
        return str.substr(0, maxLength) + "...";
    };
    const addToCart = (event, productItem) => {
        event.stopPropagation();
        const existingCartItem = cartItems.find(item => item.id === productItem.id);
        let message = truncateString(productItem?.name, 60)
        if (existingCartItem) {
            notifySuccess(`${message} already added in the cart!`);
        } else {
            let cartObj = {
                id: productItem.id,
                name: productItem.name,
                image: productItem.images,
                description: productItem.description,
                price: productItem.sell_price,
                sku: productItem.sku,
                purchaseQty: 1,
                totalPrice: 1 * JSON.parse(productItem.sell_price),
                is_tax_apply: productItem?.is_tax_apply
            };
            notifySuccess(`${message} added to the cart!`);
            dispatch(addtoCartItems(cartObj));
        }
    }


    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -100 / cardsPerRow - 1,
                behavior: 'smooth'
            });
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 100 / cardsPerRow - 1,
                behavior: 'smooth'
            });
        }
    };
    function gotoShopScreen(data) {
        navigate(`/Shop`, { state: { selectedCategory: data } })
    }
    return (
        <div className="">
            <div className="row" style={{ margin: 0 }}>
                <div className="col-md-12 col-lg-9" style={{ overflowX: 'auto', padding: 0 }}>
                    <SliderComponents banners={banners} />
                </div>
                <div className="col-md-12 col-lg-3 sidebar_hide" style={{ padding: 0 }}>
                    <div className='m-2'>
                        <ImageComponent src={banner3} alt={`Slide`} classAtribute="slider-image d-block w-100" />
                    </div>
                    {/* <img src={banner3} alt={"siteBanner"} className="img-   fluid" style={{ width: '100%' }} /> */}
                </div>
            </div>
            <div className='custom-container'>
                <div className="product-list-container mt-5">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6">
                            <div className="d-flex align-items-center">
                                <div className="mr-auto" onClick={() => gotoShopScreen(selectedCategories)}>
                                    <h5 className="bold pointer-on-hover title d-inline">Weekly Featured Products</h5>
                                    <span className="ml-3 pointer-on-hover read-more">View All</span>
                                    <span className="ml-3 pointer-on-hover">
                                        <i className="fa fa-chevron-right secondaryColor fs-6" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6">
                            <div className="text-md-right">
                                <span className="circle" onClick={handleScrollRight}>
                                    <i className="fa fa-chevron-right blackColor fontSize10" aria-hidden="true" style={{ lineHeight: '30px' }}></i>
                                </span>
                                <span className="circle ml-2" onClick={handleScrollLeft}>
                                    <i className="fa fa-chevron-left blackColor fontSize10" style={{ lineHeight: '30px', }} aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2" style={{ overflowX: 'auto' }}>
                        <div className="d-flex" style={{ whiteSpace: 'nowrap' }}>
                            {categoriesData?.map((data) => (
                                <div
                                    key={data.id}
                                    className={`customBtn pointer-on-hover mt-3 mb-3 ${selectedCategories === data.id ? 'activeBtn' : ''}`}
                                    onClick={() => handleItemClick(data.id)}
                                >
                                    {data.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-3 horizontal-product-display" ref={scrollContainerRef}>
                        {weeklyProductsList?.length > 0 ? (
                            //style={{ flexWrap: 'nowrap' }}
                            <div className="product-list" >
                                {weeklyProductsList?.map((product, index) => (
                                    <div key={index} className="product-card p-4"
                                        onClick={() => navigate(`/products-details/${product.id}`, { state: { id: product.id } })}
                                        style={{ width: `${100 / cardsPerRow - 2}% `, margin: '1%' }}>
                                        <div className="product_image">
                                            {product.images[0]?.name ? (
                                                <ImageComponent src={product.images[0]?.name} alt="products Image" />
                                            ) : (
                                                <p className='inter-medium-fonts'>Image not available</p>
                                            )}
                                        </div>
                                        <div className="product-details">
                                            <p className='brandLabel inter-medium-fonts'>{product?.brand}</p>
                                            <h3 className="product-title secondaryColor">{truncateString(product?.name, 30)}</h3>
                                            <div className="d-flex mt-2 justify-content-between">
                                                <div className='priceLabel'>${product?.price}</div>
                                                <div>
                                                    <span className="circle" onClick={(event) => addToCart(event, product)}>
                                                        <i className="fas fa-shopping-bag mt-2"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='d-flex justify-content-center'>
                                <h4 className='text-center inter-medium-fonts'>No products available</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className='mt-5'>
                    <div className='row mt-5 mb-5'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex align-items-center'>
                                <div className='mr-auto' onClick={() => navigate(`/Shop`)}>
                                    <h5 className="bold pointer-on-hover title d-inline">New Products</h5>
                                    <span className="ml-3 pointer-on-hover read-more">View All</span>
                                    <span className="ml-3 pointer-on-hover">
                                        <i className="fa fa-chevron-right secondaryColor fs-6" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div className='mt-4 mb-3' style={{ border: '1px solid #ccc', borderRadius: 15 }}>
                                {customProductsData?.newProducts?.slice(0, 3).map((product, index) => (
                                    <div className='m-3' key={index} onClick={() =>
                                        navigate(`/products-details/${product.id}`, {
                                            state: {
                                                id: product.id
                                            }
                                        })
                                    }  >
                                        <div className='row' key={index} style={{ maxHeight: 450 }}>
                                            <div className='col-12 col-md-12 col-lg-5'>
                                                <div className="product_image">
                                                    {product.images[0]?.name ? (
                                                        <ImageComponent src={product.images[0]?.name} alt={"products Image"} />) : (
                                                        <p>Image not available</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-12 col-lg-7'>
                                                <p className='brandLabel inter-medium-fonts'>{product?.brand}</p>
                                                <h3 className="product-title secondaryColor">{truncateString(product?.name, 50)}</h3>
                                                <div className="d-flex mt-2 justify-content-between">
                                                    <div className='priceLabel'>${product?.price}</div>
                                                    <div>
                                                        <span className="circle mt-1" onClick={(event) => addToCart(event, product)}>
                                                            <i className="fas fa-shopping-bag mt-2"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='' />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex align-items-center'>
                                <div className='mr-auto' onClick={() => navigate(`/Shop`)}>
                                    <h5 className="bold pointer-on-hover title d-inline">Products On Sale</h5>
                                    <span className="ml-3 pointer-on-hover read-more">View All</span>
                                    <span className="ml-3 pointer-on-hover">
                                        <i className="fa fa-chevron-right secondaryColor fs-6" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div className='mt-4 mb-3' style={{ border: '1px solid #ccc', borderRadius: 15 }}>
                                {customProductsData?.productsOnSale?.slice(0, 3).map((product, index) => (
                                    <div className='m-3' key={index} onClick={() =>
                                        navigate(`/products-details/${product.id}`, {
                                            state: {
                                                id: product.id
                                            }
                                        })
                                    } >
                                        <div className='row' key={index} style={{ maxHeight: 450 }}>
                                            <div className='col-12 col-md-12 col-lg-5'>
                                                <div className="product_image">
                                                    {product.images[0]?.name ? (
                                                        <ImageComponent src={product.images[0]?.name} alt={"products Image"} />) : (
                                                        <p>Image not available</p>
                                                    )}
                                                </div>                                            </div>
                                            <div className='col-12 col-md-12 col-lg-7'>
                                                <p className='brandLabel inter-medium-fonts'>{product?.brand}</p>
                                                <h3 className="product-title secondaryColor">{truncateString(product?.name, 50)}</h3>
                                                <div className="d-flex mt-2 justify-content-between">
                                                    <div className='priceLabel'>${product?.price}</div>
                                                    <div>
                                                        <span className="circle mt-1" onClick={(event) => addToCart(event, product)}>
                                                            <i className="fas fa-shopping-bag mt-2"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='' />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex align-items-center'>
                                <div className='mr-auto' onClick={() => navigate(`/Shop`)}>
                                    <h5 className="bold pointer-on-hover title d-inline">Top Rated Products</h5>
                                    <span className="ml-3 pointer-on-hover read-more">View All</span>
                                    <span className="ml-3 pointer-on-hover">
                                        <i className="fa fa-chevron-right secondaryColor fs-6" aria-hidden="true"></i>
                                    </span>

                                </div>
                            </div>
                            <div className='mt-4 mb-3' style={{ border: '1px solid #ccc', borderRadius: 15 }}>
                                {customProductsData?.topRatedProducts?.slice(0, 3).map((product, index) => (
                                    <div className='m-3' key={index} onClick={() =>
                                        navigate(`/products-details/${product.id}`, {
                                            state: {
                                                id: product.id
                                            }
                                        })
                                    } >
                                        <div className='row' key={index} style={{ maxHeight: 450 }}>
                                            <div className='col-12 col-md-12 col-lg-5'>
                                                <div className="product_image">
                                                    {product.images[0]?.name ? (
                                                        <ImageComponent src={product.images[0]?.name} alt={"products Image"} />) : (
                                                        <p>Image not available</p>
                                                    )}
                                                </div>                                            </div>
                                            <div className='col-12 col-md-12 col-lg-7'>
                                                <p className='brandLabel inter-medium-fonts'>{product?.brand}</p>
                                                <h3 className="product-title secondaryColor">{truncateString(product?.name, 50)}</h3>
                                                <div className="d-flex mt-2 justify-content-between">
                                                    <div className='priceLabel'>${product?.price}</div>
                                                    <div>
                                                        <span className="circle mt-1" onClick={(event) => addToCart(event, product)}>
                                                            <i className="fas fa-shopping-bag mt-2"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div>
                <FooterComponents />
                {/* <Header/> */}
            </div>

        </div >
    );
}

export default HomeScreen;
