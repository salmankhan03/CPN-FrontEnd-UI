import React, { useEffect, useState } from "react";
import { json, useLocation } from "react-router-dom";
import ProductTags from "../../components/ProductTagsComponents/ProductTagsComponents";
import RatingComponents from "../../components/RatingComponents/RatingComponents";
import ImageComponent from "../../components/ImageComponents/ImageComponents";
// import Magnifier from 'react-image-magnify';
import ProductServices from "../../services/ProductServices";
import { useDispatch, useSelector } from "react-redux";
// import ReactImageZoom from 'react-image-zoom';
import { setProductDetails } from '../../redux/action/action';
import { addtoCartItems, updateCartItems } from "../../redux/action/cart-action"
import ReactImageMagnify from 'react-image-magnify';
import { Toast, notifySuccess, notifyError } from '../../components/ToastComponents/ToastComponents';
// import Slider from "react-slick";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';



function ProductDetails() {
    const dispatch = useDispatch();
    const location = useLocation();
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const categoryList = useSelector(state => state.CategoryReducer.categoryListData);
    const [categoryName, setCategoryName] = useState()
    const [productData, setProductData] = useState()
    const [productID, setProductID] = useState(location?.state?.id)
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedTab, setSelectedTab] = useState('description');
    const tabNames = ['description', 'review', 'shipping'];
    const [startIndex, setStartIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
        // 
        // notifyError('added to the cart!');
        if (productID) {
            getProductsDetails();
        }
    }, []);



    useEffect(() => {
        setCategoryName(getCategoryNameById(productData?.category_id, categoryList));
    }, [productData])
    const getCategoryNameById = (categoryId, categoryList) => {
        for (const category of categoryList) {
            if (category.id === categoryId) {
                return category.name;
            }
            if (category.children && category.children.length > 0) {
                const childCategoryName = getCategoryNameById(categoryId, category.children);
                if (childCategoryName) {
                    return childCategoryName;
                }
            }
        }
        return null;
    };

    function getProductsDetails() {
        ProductServices.getProductById(productID).then((resp) => {

            if (resp?.status_code === 200) {
                // console.log("res",resp.data)
                dispatch(setProductDetails({
                    ...resp.data
                }))
                // setLoading(false)
                setProductData(resp?.data)
                if (resp?.data?.images.length > 0) {
                    setSelectedImage(resp?.data?.images[0]?.name)
                    // setSelectedImage("https://m.media-amazon.com/images/I/71wbxatiuDL._SX569_.jpg")

                } else {
                    setSelectedImage("https://m.media-amazon.com/images/I/71wbxatiuDL._SX569_.jpg")
                }
            }
        }).catch((error) => {
            // setLoading(false)
            console.log(error)
        })
    }


    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleNext = () => {
        // const newIndex = Math.min(startIndex + 1, productData?.images?.length - 1);
        const newIndex = (startIndex + 1) % productData?.images?.length;
        setStartIndex(newIndex);

        // setStartIndex(newIndex);
    };

    const handlePrev = () => {
        // const newIndex = Math.max(startIndex - 1, 0);
        const newIndex = (startIndex - 1 + productData?.images?.length) % productData?.images?.length;

        setStartIndex(newIndex);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleThumbnailHover = (imagePath) => {
        setSelectedImage(imagePath);
    };

    const handleThumbnailClick = (imagePath) => {
        // Handle click event if needed
        setSelectedImage(imagePath);
    };


    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const renderTabs = () => {
        return tabNames.map((tabName) => (
            <td
                key={tabName}
                className={`tab ${selectedTab === tabName ? 'active' : ''}`}
                onClick={() => handleTabClick(tabName)}
            >
                {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
            </td>
        ));
    };
    const renderContent = () => {
        switch (selectedTab) {
            case 'description':
                return <p>{productData?.description}</p>;
            case 'review':
                return <p>Product Reviews Go Here</p>;
            case 'enquiry':
                return <p>Enquiry Form Goes Here</p>;
            case 'shipping':
                return <p>Shipping Information Goes Here</p>;
            default:
                return null;
        }
    };
    const addtoCart = (product) => {
        // notifySuccess('added to the cart!');
        const existingCartItem = cartItems.find(item => item.id === product.id);
        if (existingCartItem) {
            const updatedCartItems = cartItems.map(item => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        purchaseQty: quantity,//item.purchaseQty +
                        totalPrice: quantity * JSON.parse(product.price) //(item.purchaseQty + quantity) 
                    };
                } else {
                    return item;
                }
            });
            dispatch(updateCartItems(updatedCartItems));

            // dispatch(updateCartItems(updatedCartItems));
        } else {
            let cartObj = {
                id: product.id,
                name: product.name,
                image: product.images,
                description: product.description,
                price: product.price,
                sku: product.sku,
                purchaseQty: quantity,
                totalPrice: quantity * JSON.parse(product.price)
            };
            notifySuccess(`${product.name} added to the cart!`);
            dispatch(addtoCartItems(cartObj));
        }
    }
    return (
        <div className="container single_product_container">
            {productData && (
                <div>
                    <div className="row">
                        <Toast />

                        <div className="col">
                            <div className="breadcrumbs d-flex flex-row align-items-center">
                                <ul>
                                    <li>
                                        <a href="/">Home</a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                            {productData?.id}
                                        </a>
                                    </li>
                                    {/* <li className="active">
                                        <a href="#">
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                            {productData.id}
                                        </a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-lg-5">
                            <div className="single_product_pics">
                                <div className="row">
                                    <div className="col-lg-12 image_col order-lg-2 order-1">                                      
                                        <div className="fluid__image-container">
                                            <ReactImageMagnify {...{
                                                smallImage: {
                                                    alt: 'Wristwatch by Ted Baker London',
                                                    isFluidWidth: true,
                                                    src: selectedImage,
                                                },
                                                largeImage: {
                                                    src: selectedImage,
                                                    width: 1200,
                                                    height: 1800
                                                },
                                                enlargedImageContainerClassName: 'custom-enlarged-container',

                                            }} />
                                        </div>
                                        <div className="single_product_thumbnails">
                                            <div className="thumbnail-container" >
                                                {productData?.images.length > 0 ? (
                                                    <div className="row">
                                                        <div className="col-lg-1 col-2">
                                                            <button className="prev-button prev-next-button" onClick={handlePrev} disabled={startIndex === 0}>
                                                                <i class="fa fa-angle-double-left p-2"></i>
                                                            </button>
                                                        </div>
                                                        <div className="col-lg-10 col-8">
                                                            <div className="thumbnails-container overflow-x-hidden">
                                                                <ul className="productsSlider-ul">
                                                                    {productData?.images &&
                                                                        productData?.images?.slice(startIndex, startIndex + 4).map((item, index) => (
                                                                            <li
                                                                                key={index}
                                                                                onMouseEnter={() => handleThumbnailHover(item?.name)}
                                                                                onClick={() => handleThumbnailClick(item?.name)}
                                                                                className="m-2"
                                                                            >
                                                                                <ImageComponent src={item?.name} alt={`Product Image ${index}`} />
                                                                            </li>
                                                                        ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-1 col-2">

                                                            <button className="next-button prev-next-button" onClick={handleNext} disabled={startIndex >= productData?.variants?.length - 4}>
                                                                <i class="fa fa-angle-double-right p-2"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="product_details">
                                <div className="product_details_title">
                                    <h2>{productData?.name}</h2>
                                    <p>{productData?.description}</p>
                                </div>
                                {/* <div className="original_price">
                                    {" "}
                                    ₹ {(parseFloat(productData.price) + 30).toFixed(2)}
                                </div> */}
                                <div className="product_price mt-3">
                                    ₹ {productData?.price}
                                </div>
                                {/* <div className="product_rating mt-3">
                                    <RatingComponents rating={productData.rating} />
                                </div> */}
                                <div className="mt-3">Quantity:</div>
                                <div className="quantity d-flex  flex-sm-row align-items-sm-center">
                                    <div className="quantity_selector">
                                        <span
                                            className={
                                                productData?.quantity > 1 ? "minus" : "minus disabled"
                                            }
                                            onClick={() => handleDecrement()}
                                        >
                                            <i className="fa fa-minus" aria-hidden="true"></i>
                                        </span>
                                        <span id="quantity_value">{quantity}</span>
                                        <span
                                            className="plus"
                                            onClick={() => handleIncrement()}
                                        >
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                        </span>
                                    </div>

                                    <div className="red_button product-add_to_cart_button" onClick={() => addtoCart(productData)}>
                                        {/* <div className=""> */}
                                        add to cart
                                        {/* </div> */}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    SKU: <span className="ml-2">{productData?.sku}</span>
                                </div>
                                <div className="mt-3">
                                    Category: <span className="ml-2">{categoryName}</span>
                                </div>
                                <div className="product-tags-container mt-3">
                                    Tags:
                                    {/* <ProductTags tags={productData?.tags} /> */}
                                </div>
                                <div className="mt-3">
                                    Brand: <span className="ml-2">{productData?.brand}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4" >
                        <table className="product-details-table">
                            <tbody>
                                <tr>{renderTabs()}</tr>
                                <tr className="tableBody-border" >
                                    <td colSpan="4" className="content">
                                        {renderContent()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* <div className="content">{renderContent()}</div> */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
