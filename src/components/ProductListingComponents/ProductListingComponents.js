import React from "react";
import { useNavigate } from 'react-router-dom';
import RatingComponents from "../RatingComponents/RatingComponents";
import ImageComponent from "../ImageComponents/ImageComponents";




function ProductListing(props) {
    
    const navigate = useNavigate();
    const { productItem } = props;
    const truncateString = (str, maxLength) => {
        if (str?.length <= maxLength) return str;
        return str.substr(0, maxLength) + "...";
    };

    return (


        <div className="product-item men m-md-4 mt-5 prductsListBorder">
        
                <div
                    className="product discount product_filter"
                    onClick={() =>
                        navigate(`/products-details/${productItem.id}`, {
                            state: {
                                id: productItem.id
                            }
                        })
                    }
                >
                    {productItem?.images?.length > 0 ? (
                        <div className="product_image">
                            {productItem.images[0].name ? (
                                <ImageComponent src={productItem.images[0].name} alt={"products Image"} />) : (
                                <p>Image not available</p>
                            )}
                        </div>
                    ) : (
                        <div className="product_image">
                            <ImageComponent src="https://backend.kingsmankids.com/uploads/template_images/2024/01/laravel-c136ade819e33b5afcda41d1271d247c.webp" alt={"products Image"} />
                        </div>
                    )}
                    <div className="product_info">
                        <h6 className="product_name">
                            <div>{truncateString(productItem?.name, 80)}</div>
                        </h6>
                        <div className="product_price">
                            ₹ {productItem.price}
                            <span> ₹ {(parseFloat(productItem.price) + 30).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

        </div>
    );
}

export default ProductListing;
