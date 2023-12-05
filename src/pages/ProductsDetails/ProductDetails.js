/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductTags from "../../components/ProductTagsComponents/ProductTagsComponents";
import RatingComponents from "../../components/RatingComponents/RatingComponents";
import ImageComponent from "../../components/ImageComponents/ImageComponents";
import Magnifier from 'react-image-magnify';
import ProductServices from "../../services/ProductServices";
// import ReactImageZoom from 'react-image-zoom';



function ProductDetails() {
    const location = useLocation();
    // console.log(props)
    // console.log(location)

    const [productData, setProductData] = useState()
    const [productID, setProductID] = useState(location?.state?.id)
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedTab, setSelectedTab] = useState('description');
    const tabNames = ['description', 'review', 'shipping'];
    const [startIndex, setStartIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        if (productID) {
            getProductsDetails();
        }
    }, []);

    function getProductsDetails() {
        ProductServices.getProductById(productID).then((resp) => {
            if (resp?.status_code === 200) {
                // console.log("res",resp.data)
                setProductData(resp?.data)
                console.log(resp?.data?.images)
                if (resp?.data?.images.length > 0) {
                    // setSelectedImage(resp?.data?.images[0]?.name)
                    setSelectedImage("https://m.media-amazon.com/images/I/71wbxatiuDL._SX569_.jpg")

                } else {
                    setSelectedImage("https://m.media-amazon.com/images/I/71wbxatiuDL._SX569_.jpg")
                }
            }
        }).catch((error) => {
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
        const newIndex = Math.min(startIndex + 1, productData?.images?.length - 1);
        setStartIndex(newIndex);
    };

    const handlePrev = () => {
        const newIndex = Math.max(startIndex - 1, 0);
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

    return (
        <div className="" >
            <div className="container single_product_container">
                {productData && (
                    <div>
                        <div className="row">
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
                            <div className="col-lg-7">
                                <div className="single_product_pics">
                                    <div className="row">
                                        <div className="col-lg-12 image_col order-lg-2 order-1">
                                            <div className="single_product_image">
                                                {/* <div
                                            //     className="single_product_image_background"
                                            //     // style={{
                                            //     //     backgroundImage: `url(${selectedImage})`,
                                            //     // }}
                                            // /> */}
                                                {/* <Magnifier
                                                image={selectedImage}
                                                style={{ width: '400px', height: '300px' }}
                                                className="custom-magnifier"
                                                enlargedImagePosition="over"
                                                enlargedImageContainerStyle={{ background: 'white' }}
                                                cursorStyle="crosshair"
                                                dragToMove={true}
                                                dragToMoveEnabled={true}
                                                // onError={onError}
                                            /> */}

                                                <div
                                                    className="single_product_image_background"
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    style={{
                                                        backgroundImage: `url(${selectedImage})`,
                                                    }}
                                                >
                                                </div>

                                                {isHovered && (
                                                    <div className="zoomed-image-container sidebar_hide">
                                                        {/* Replace 'path/to/your/large-image.jpg' with the path to your larger image */}
                                                        <img src={selectedImage} alt="Zoomed Product" />
                                                    </div>
                                                )}


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
                                                                            productData?.images?.slice(startIndex, startIndex + 3).map((item, index) => (
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
                            <div className="col-lg-5">
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

                                        <div className="red_button product-add_to_cart_button">
                                            <a href="#">add to cart</a>
                                        </div>

                                    </div>
                                    <div className="mt-3">
                                        SKU: <span className="ml-2">{productData?.sku}</span>
                                    </div>
                                    <div className="mt-3">
                                        Category: <span className="ml-2">{productData?.category}</span>
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
        </div>
    );
}

export default ProductDetails;
