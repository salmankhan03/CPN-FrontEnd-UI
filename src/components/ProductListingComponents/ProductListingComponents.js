import React from "react";
import { useNavigate } from 'react-router-dom';
import RatingComponents from "../RatingComponents/RatingComponents";
import ImageComponent from "../ImageComponents/ImageComponents";




function ProductListing(props) {
    const navigate = useNavigate();
    const { productItem } = props;

    const truncateString = (str, maxLength) => {
        if (str.length <= maxLength) return str;
        return str.substr(0, maxLength) + "...";
    };

    return (
        <div className="product-item men m-1" style={{ border: "1px solid" }}>
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
                <div className="product_image">
                    <ImageComponent src={productItem.imagePath} alt={"products Image"} />
                </div>
                {/* <div className="favorite favorite_left">
           <i className="far fa-heart"></i>
         </div> */}
                <div className="product_info">
                    <h6 className="product_name">
                        <div>{truncateString(productItem.title, 20)}</div>
                    </h6>
                    <div className="product_rating">
                        <RatingComponents rating={productItem.rating} showReviewCount={78} />
                    </div>
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
