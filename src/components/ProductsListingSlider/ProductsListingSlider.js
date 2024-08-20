import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/css/slick.css';

import { useNavigate } from 'react-router-dom';
import ImageComponent from '../ImageComponents/ImageComponents';
import ButtonComponent from '../ButtonComponents/ButtonComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStoreSlash } from '@fortawesome/free-solid-svg-icons';


const ProductsListingSlider = ({ data, recordsDisplay, settings, truncateString, addToCart, navigated }) => {
    const [recordsLength, setRecordsLength] = useState(recordsDisplay ? recordsDisplay : 10);
    const navigate = useNavigate();

    const displayedData = recordsLength ? data.slice(0, recordsLength) : data;

    return (
        <div>
            <Slider {...settings}>
                {displayedData.map((category, index) => (
                    <React.Fragment key={index} >
                        {index + 1 !== recordsLength ? (
                            <div className="product-slide"  onClick={() => navigate(`/products-details/${category.id}`, { state: { id: category.id } })}>
                                <div className="product-details category-item product-card p-3 m-2" style={{width:'auto'}}>
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
                                            <div className={`${category?.price ? 'priceLabel' : 'normalPriceLabel'} sf-Bold`}>
                                                ${category?.sell_price}
                                            </div>
                                            {/* { category?.quantity > 0 && category?.price && <span className="actualPrice sf-Regular">${category?.price}</span>} */}
                                            {category?.sell_price !== category?.price && (
                                                <span className="actualPrice sf-Regular">${category?.price}</span>
                                            )}
                                        </div>
                                        {Number(category?.quantity) === 0 &&
                                            <div class="out-of-stock-circle">
                                                <FontAwesomeIcon icon={faStoreSlash} />
                                            </div>
                                        }
                                        {Number(category?.quantity) !== 0 &&
                                        <div>
                                            <span className="circle" onClick={(event) => addToCart(event, category)}>
                                                <i className="fas fa-shopping-bag mt-2"></i>
                                            </span>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : (

                            <div className="product-slide view-all-slide" key="view-all">
                                <div className="product-details category-item p-4 m-2 d-flex align-items-center justify-content-center">
                                    <ButtonComponent cssClass="shopping-btn btn-border-radius w-100" onClick={() => navigated()} label="View All" />
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </Slider>
        </div>
    );
};

export default ProductsListingSlider;
