import React, { useEffect, useRef, useState } from 'react';
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
import BannersServices from '../../services/BannersServices';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../assets/css/slick.css"
import Loading from '../../components/LoadingComponents/LoadingComponents';
import SpinnerLoading from '../../components/SpinnerComponents/SpinnerLoader';
import MetaTitle from '../../components/HelmetComponent/MetaTitle';

const useSlidesToShow = () => {
    const [slidesToShow, setSlidesToShow] = useState(1);

    const updateSlidesToShow = () => {
        const width = window.innerWidth;
        if (width >= 1680) {
            setSlidesToShow(4);
        }
        else if (width >= 1440) {
            setSlidesToShow(4);
        }
        else if (width >= 992) {
            setSlidesToShow(3);
        } else if (width >= 768) {
            setSlidesToShow(2);
        } else if (width >= 576) {
            setSlidesToShow(1);
        } else {
            setSlidesToShow(1);
        }
    };

    useEffect(() => {
        updateSlidesToShow(); // Set initial value
        window.addEventListener('resize', updateSlidesToShow);
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    return slidesToShow;
};

function HomeScreen() {
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [page, setPage] = useState(1)
    const [defaultLimit, setDefaultLimit] = useState(20)
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const dispatch = useDispatch();
    const [categoriesData, setCategoriesData] = useState();
    const [weeklyProductsList, setWeeklyProductsList] = useState([])
    const [customProductsData, setCustomProductsData] = useState()
    const [slider, setSlider] = useState([])
    const [banner, setBanner] = useState([])
    const [weekly_featured_products_loader, setWeekly_featured_products_loader] = useState(false)
    const [custom_products_loader, setCustom_products_loader] = useState(false)
    const [slider_loader, setSlider_loader] = useState(false)
    const [banner_loader, setBanner_loader] = useState(false)
    const [loading, setLoading] = useState(true);
    const leftBanners = banner && banner.filter(item => item.side === "LEFT");
    const rightBanners = banner && banner.filter(item => item.side === "RIGHT");
    const slidesToShow = Math.min(weeklyProductsList?.length, useSlidesToShow());
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slidesToShow,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(weeklyProductsList?.length, 2),
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                getSlider(),
                getBanners(),
                getCategoryList(),
                getCategoryWiseWeeklyProducts(),
                getCustomProductsList()
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    // Cards

    function getSlider() {
        setSlider_loader(true)
        BannersServices.getSliders().then((resp) => {
            const transformedData = resp?.list.map(item => ({
                id: item.id,
                src: item?.image,
                content: item?.content,
                heading: item?.heading,
                button_label: item?.button_label,
                button_url: item?.button_url,
                position: item?.content_position
            }));
            setSlider(transformedData)
            const timers = setTimeout(() => {
                setSlider_loader(false)
            }, 500)
            return () => clearTimeout(timers);
        })
    }
    function getBanners() {
        setBanner_loader(true)
        BannersServices.getBanners().then((resp) => {
            setBanner(resp?.list)
            const timers = setTimeout(() => {
                setBanner_loader(false)
            }, 500)
            return () => clearTimeout(timers);
        })
    }
    const addViewAllCategory = (data) => {
        return [
            {
                id: 0,
                name: "View All",
                description: "ALL types of Sports equipments",
                status: "show",
                children: [],
                category_image: []
            },
            ...data
        ];
    };
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
                const categories = Array.isArray(resp?.tree?.data) ? resp.tree.data : [];
                const updatedCategories = addViewAllCategory(categories);
                setCategoriesData(updatedCategories);
            }
        }).catch((error) => {
            // setLoading(false)
            console.log(error)
        })
    }
    function getCategoryWiseWeeklyProducts(data) {
        setWeekly_featured_products_loader(true)
        ProductServices.getWeeklyProducts({
            page: page,
            limit: defaultLimit,
            category: data ? data : ''
        }).then((resp) => {
            if (resp?.status_code === 200) {
                setWeeklyProductsList(resp?.list)
                const timers = setTimeout(() => {
                    setWeekly_featured_products_loader(false)
                }, 500)
                return () => clearTimeout(timers);
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    async function getCustomProductsList() {
        setCustom_products_loader(true)
        await ProductServices.getDashboardProductslist().then((resp) => {
            if (resp?.status_code === 200) {
                console.log(resp)
                setCustomProductsData(resp?.list)
                const timers = setTimeout(() => {
                    setCustom_products_loader(false)
                }, 500)
                return () => clearTimeout(timers);
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



    function gotoShopScreen(data) {
        navigate(`/Shop`, { state: { sorting: data } })
    }

    const ProductSection = ({ title, products, category, truncateLength, loader }) => {
        // if (loader) {
        //     return (
        //         <div className=''>
        //             <Loading loading={loader} />
        //         </div>
        //     );
        // }
        return (
            <div className='col-12 col-md-4 col-lg-4'>
                <div className='d-flex align-items-center'>
                    <div className='mr-auto' onClick={() => gotoShopScreen(category)}>
                        <div className="bold pointer-on-hover title d-inline" style={{ fontWeight: 'bold', fontSize: 'larger' }}>
                            {title}
                        </div>
                        <span className="ml-3 pointer-on-hover read-more">View All</span>
                        <span className="ml-3 pointer-on-hover">
                            <i className="fa fa-chevron-right secondaryColor fs-6" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                <div className='mt-4 mb-3' style={{ border: '1px solid #ccc', borderRadius: 15, minHeight: 200 }}>
                    {loader ? (
                        <div className='d-flex justify-content-center'>
                            <Loading loading={loader} />
                        </div>
                    ) : (
                        products?.slice(0, 3).map((product, index) => (
                            <div className='m-3' key={index} onClick={() =>
                                navigate(`/products-details/${product.id}`, {
                                    state: {
                                        id: product.id
                                    }
                                })
                            }>
                                <div className='row' style={{ maxHeight: 450 }}>
                                    <div className='col-12 col-md-12 col-lg-5'>
                                        <div className="product_image">
                                            {product.images[0]?.name ? (
                                                <ImageComponent src={product.images[0]?.name} alt={"products Image"} />
                                            ) : (
                                                <p>Image not available</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-12 col-lg-7 d-flex align-items-center'>
                                        <div className='text-left w-100'>
                                            <p className='brandLabel sf-Regular'>{product?.brand}</p>
                                            <h3 className="product-title secondaryColor sf-Medium font-weight-normal">{truncateString(product?.name, truncateLength)}</h3>
                                            <div className="d-flex mt-1 justify-content-between align-items-center w-100">
                                                <div>
                                                    <div className={`${product?.price ? 'priceLabel' : 'normalPriceLabel'} sf-Bold`}>${product?.sell_price}</div>
                                                    {product?.price && <span className="actualPrice sf-Regular">${product?.price}</span>}
                                                </div>
                                                <div>
                                                    <span className="circle mt-1" onClick={(event) => addToCart(event, product)}>
                                                        <i className="fas fa-shopping-bag mt-2"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {index < products.length - 1 && <hr />}
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    };

    const Banner = ({ banners }) => {
        return (
            <div className="banner-container">
                {banners.map((banner, index) => (
                    <React.Fragment key={index}>
                        <div className="banner-item w-100">
                            <div className={`banner-content ${banner?.content_position === 'LEFT' ? 'text-left' : banner?.content_position === 'CENTER' ? 'text-center' : 'text-right'}`}>
                                <h6 className="smallFonts">{banner.heading}</h6>
                                <p className="banner-text">{banner.content}</p>
                            </div>
                            <img
                                src={banner.link}
                                alt={`Banner ${index}`}
                                className="img-fluid banner-img"
                            />
                        </div>
                    </React.Fragment>
                ))}
            </div>
        );
    }
    if (loading) {
        return <SpinnerLoading loading={loading} />
    }

    return (
        <div className="">
            <MetaTitle pageTitle={'Ecommerce - Vitamins, Supplements, Natural Health Products'} />
            <React.Fragment>
                <div className="row" style={{ margin: 0 }}>
                    <div className="col-md-12 col-lg-12" style={{ overflowX: 'auto', padding: 0 }}>
                        {slider_loader ? (
                            <div className='d-flex justify-content-center'>
                                <Loading loading={slider_loader} />
                            </div>
                        ) : (
                            slider?.length > 0 &&
                            <SliderComponents banners={slider} />

                        )}
                    </div>
                </div>
                <div className='custom-container container'>
                    <div className="product-list-container marginTopBottom">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12">
                                <div className="d-flex align-items-center">
                                    <div className="mr-auto" onClick={() => gotoShopScreen("weekly_featured_products")}>
                                        <h5 className="bold pointer-on-hover title d-inline">Weekly Featured Products</h5>
                                        <span className="ml-3 pointer-on-hover read-more">View All</span>
                                        <span className="ml-3 pointer-on-hover">
                                            <i className="fa fa-chevron-right secondaryColor fs-6" aria-hidden="true"></i>
                                        </span>
                                    </div>
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
                        <div className="mt-3">

                            {weekly_featured_products_loader ? (
                                <div className='d-flex justify-content-center'>
                                    <Loading loading={weekly_featured_products_loader} />
                                </div>
                            ) : (
                                weeklyProductsList?.length > 0 ? (
                                    <div className="weekly-featured" >
                                        <Slider {...settings}>
                                            {weeklyProductsList.map((category, index) => (
                                                <div key={index} className="product-slide" onClick={() => navigate(`/products-details/${category.id}`, { state: { id: category.id } })}>
                                                    <div className="product-details category-item product-card p-4 m-2">
                                                        <p className="brandLabel sf-Regular">{category?.brand}</p>
                                                        <h3 className="product-title secondaryColor sf-Medium font-weight-normal">{truncateString(category?.name, 70)}</h3>
                                                        <div className="product_image mb-3">
                                                            {category?.images[0]?.name ? (
                                                                <ImageComponent src={category?.images[0]?.name} alt="products Image" />
                                                            ) : (
                                                                <p className="sf-Regular">Image not available</p>
                                                            )}
                                                        </div>
                                                        <div className="d-flex mt-2 justify-content-between">
                                                            <div>
                                                                <div className={`${category?.price ? 'priceLabel' : 'normalPriceLabel'} sf-Bold`}>${category?.sell_price}</div>
                                                                {category?.price && <span className="actualPrice sf-Regular">${category?.price}</span>}
                                                            </div>
                                                            <div>
                                                                <span className="circle" onClick={(event) => addToCart(event, category)}>
                                                                    <i className="fas fa-shopping-bag mt-2"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                ) : (
                                    <div className='d-flex justify-content-center'>
                                        <h4 className='text-center sf-Regular'>No products available</h4>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className='marginTopBottom '>
                        <div className='row mt-5 mb-5'>
                            <div className='col-12 col-md-6'>
                                {banner_loader ? (
                                    <div className='d-flex justify-content-center'>
                                        <Loading loading={banner_loader} />
                                    </div>
                                ) : (
                                    <Banner banners={leftBanners} />
                                )}
                            </div>
                            <div className='col-12 col-md-6 bannerTopMargin'>
                                {banner_loader ? (
                                    <div className='d-flex justify-content-center'>
                                        <Loading loading={banner_loader} />
                                    </div>
                                ) : (
                                    <Banner banners={rightBanners} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='marginTopBottom'>
                        <div className='row mt-5 mb-5'>
                            <ProductSection
                                title="New Products"
                                products={customProductsData?.newProducts?.slice(0, 3)}
                                category="new_products"
                                truncateLength={70}
                                loader={custom_products_loader}

                            />
                            <ProductSection
                                title="Products On Sale"
                                products={customProductsData?.productsOnSale?.slice(0, 3)}
                                category="products_on_sale"
                                truncateLength={50}
                                loader={custom_products_loader}
                            />
                            <ProductSection
                                title="Top Rated Products"
                                products={customProductsData?.topRatedProducts?.slice(0, 3)}
                                category="top_rated_products"
                                truncateLength={50}
                                loader={custom_products_loader}

                            />
                        </div>
                    </div>
                    <div className='pb-2'>
                        <FooterComponents />
                    </div>
                </div>

            </React.Fragment>
        </div >
    );
}

export default HomeScreen;
