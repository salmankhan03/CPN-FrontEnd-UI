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



function ProductDetails(props) {
    const location = useLocation();
    const [productData, setProductData] = useState({
        id: "sda214541hhgsda",
        imagePath: "https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
        description: "Ut tellus dolor, dapibus eget, elementum vel, cursus eleifend, elit. Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis.",
        title: "Broad Pharmacy Action Vitamin D 1000IU Cap X",
        price: "35",
        variants: [
            {
                "imagePath": "https://m.media-amazon.com/images/I/614LY1dO+ZL._SX679_.jpg"
            },
            {
                "imagePath": "https://m.media-amazon.com/images/I/61zKrW4lc0L._SX679_.jpg"
            },
            {
                "imagePath": "https://m.media-amazon.com/images/I/61HC3V8todL._SX679_.jpg"
            },
            {
                "imagePath": "https://m.media-amazon.com/images/I/61HAvPE6HmL._SX679_.jpg"
            },
            {
                "imagePath": "https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg"
            },
            {
                "imagePath": "https://m.media-amazon.com/images/I/610QgFSxa3L._SL1080_.jpg"
            }
        ],
        tags: ['New', 'Sale', 'Organic', 'Free Shipping'],
        rating: 4.5,
        quantity: 60,
        sku: "dsad0121",
        category: "test",
        brand: "Seltzer"

    })
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(productData.imagePath);
    const [selectedTab, setSelectedTab] = useState('description');
    const tabNames = ['description', 'review', 'shipping'];
    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        const newIndex = Math.min(startIndex + 1, productData.variants.length - 1);
        setStartIndex(newIndex);
    };

    const handlePrev = () => {
        const newIndex = Math.max(startIndex - 1, 0);
        setStartIndex(newIndex);
    };

    useEffect(() => {
        getProductsDetails()
    }, [])
    function getProductsDetails() {
        // ProductDetails Api Call
    }
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
                return <p>Mauris fermentum dictum magna. Sed laoreet aliquam leo. Ut tellus dolor, dapibus eget, elementum vel, cursus eleifend, elit. Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Integer rutrum ante eu lacus. Vestibulum libero nisl, porta vel, scelerisque eget, malesuada at, neque. Vivamus eget nibh. Etiam cursus leo vel metus. Nulla facilisi. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.

                    Suspendisse sollicitudin velit sed leo.arrow_forward
                    Ut pharetra augue nec auguearrow_forward
                    Nam elit agna, endrerit sit amet, tincidunt ac, viverra sed, nullaarrow_forward
                    Donec porta diam eu massaarrow_forward
                    Quisque diam lorem, interdum vitae, dapibus ac.</p>;
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
                                            {productData.id}
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
                                            <div
                                                className="single_product_image_background"
                                                style={{
                                                    backgroundImage: `url(${selectedImage})`,
                                                }}
                                            />
                                        </div>
                                        <div className="single_product_thumbnails">
                                            <div className="thumbnail-container" >
                                                <div className="row">
                                                    <div className="col-lg-1 col-2">

                                                        <button className="prev-button prev-next-button" onClick={handlePrev} disabled={startIndex === 0}>
                                                            <i class="fa fa-angle-double-left p-2"></i>
                                                        </button>
                                                    </div>
                                                    <div className="col-lg-10 col-8">
                                                        <div className="thumbnails-container overflow-x-hidden">
                                                            <ul className="productsSlider-ul">
                                                                {productData.variants &&
                                                                    productData.variants.slice(startIndex, startIndex + 3).map((item, index) => (
                                                                        <li
                                                                            key={index}
                                                                            onMouseEnter={() => handleThumbnailHover(item.imagePath)}
                                                                            onClick={() => handleThumbnailClick(item.imagePath)}
                                                                            className="m-2"
                                                                        >
                                                                            <ImageComponent src={item.imagePath} alt={`Product Image ${index}`} />
                                                                        </li>
                                                                    ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1 col-2">

                                                        <button className="next-button prev-next-button" onClick={handleNext} disabled={startIndex >= productData.variants.length - 4}>
                                                        <i class="fa fa-angle-double-right p-2"></i>

                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="product_details">
                                <div className="product_details_title">
                                    <h2>{productData?.title}</h2>
                                    <p>{productData?.description}</p>
                                </div>
                                {/* <div className="original_price">
                                    {" "}
                                    ₹ {(parseFloat(productData.price) + 30).toFixed(2)}
                                </div> */}
                                <div className="product_price mt-3">
                                    ₹ {productData.price}
                                </div>
                                {/* <div className="product_rating mt-3">
                                    <RatingComponents rating={productData.rating} />
                                </div> */}
                                <div className="mt-3">Quantity:</div>
                                <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                                    <div className="quantity_selector">
                                        <span
                                            className={
                                                productData?.quantity > 1 ? "minus" : "minus disabled"
                                            }
                                            onClick={() => this.onRemoveClicked()}
                                        >
                                            <i className="fa fa-minus" aria-hidden="true"></i>
                                        </span>
                                        <span id="quantity_value">{productData.quantity}</span>
                                        <span
                                            className="plus"
                                        // onClick={() => this.onAddClicked()}
                                        >
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                        </span>
                                    </div>

                                    <div
                                        className="red_button product-add_to_cart_button"
                                    //   onClick={this.addToBag}
                                    >
                                        <a href="#">add to cart</a>
                                    </div>

                                    {/* <div className="red_cart_button product_add_to_cart_icon">
                      <a href="#">
                        <i className="fas fa-cart-arrow-down"></i>
                      </a>
                    </div> */}

                                    <div className="product_favorite d-flex flex-column align-items-center justify-content-center">
                                        <i className="far fa-heart"></i>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    SKU: <span className="ml-2">{productData.sku}</span>
                                </div>
                                <div className="mt-3">
                                    Category: <span className="ml-2">{productData.category}</span>
                                </div>
                                <div className="product-tags-container mt-3">
                                    Tags:<ProductTags tags={productData.tags} />
                                </div>
                                <div className="mt-3">
                                    Brand: <span className="ml-2">{productData.brand}</span>
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

            {/* <LoginRegister
          show={this.state.modalShow}
          login={this.state.login}
          registerClicked={() => this.registerClicked()}
          loginClicked={() => this.loginClicked()}
          onHide={() => this.showHideModal()}
        /> */}
        </div>
        // <div>
        //     ProductDetails
        // </div>
    );
}

export default ProductDetails;
