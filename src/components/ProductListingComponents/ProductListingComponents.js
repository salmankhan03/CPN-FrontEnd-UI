import React from "react";
import { useNavigate } from 'react-router-dom';
import RatingComponents from "../RatingComponents/RatingComponents";
import ImageComponent from "../ImageComponents/ImageComponents";
import { notifyError, notifySuccess } from "../ToastComponents/ToastComponents";
import { addtoCartItems, updateCartItems } from "../../redux/action/cart-action";
import { useDispatch, useSelector } from "react-redux";




function ProductListing(props) {
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productItem } = props;
    const truncateString = (str, maxLength) => {
        if (str?.length <= maxLength) return str;
        return str.substr(0, maxLength) + "...";
    };

    const addToCart = (event, productItem) => {
        event.stopPropagation();
        const existingCartItem = cartItems.find(item => item.id === productItem.id);
        let message = truncateString(productItem?.name, 60)
        if (existingCartItem) {
            if ((existingCartItem?.purchaseQty + 1) <= existingCartItem?.availableQty) {
                const updatedCartItems = cartItems.map(item => {
                    if (item.id === productItem.id) {
                        return {
                            ...item,
                            purchaseQty: 1 + item?.purchaseQty,
                            totalPrice: (1 + item?.purchaseQty) * JSON.parse(productItem?.sell_price),
                            price: productItem.sell_price,
                            sku: productItem.sku,
                            availableQty: productItem?.quantity
                        };
                    } else {
                        return item;
                    }
                });
                dispatch(updateCartItems(updatedCartItems));
                notifySuccess(`${message} already added in the cart!`);
            } else {
                notifyError(`Products Quantity not Sufficient`);
            }
        } else {
            if (Number(productItem?.quantity) <= productItem?.quantity ) {
                let cartObj = {
                    id: productItem.id,
                    name: productItem.name,
                    image: productItem.images,
                    description: productItem.description,
                    price: productItem.sell_price,
                    sku: productItem.sku,
                    purchaseQty: 1,
                    totalPrice: 1 * JSON.parse(productItem.sell_price),
                    is_tax_apply: productItem?.is_tax_apply,
                    availableQty: productItem?.quantity

                };
                notifySuccess(`${message} added to the cart!`);
                dispatch(addtoCartItems(cartObj));
            } else {
                notifyError(`Products Quantity not Sufficient`);
            }
        }
    }

    return (

        // m-md-4
        <div className="product-item men m-md-2 mt-5 prductsListBorder">

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
                <p className='brandLabel sf-Regular' style={{ marginBottom: '0px' }}>{productItem?.brand}</p>
                <h3 className="product-title secondaryColor pt-2 sf-Medium font-weight-normal " style={{}}>{truncateString(productItem?.name, 60)}</h3>

                {productItem?.images?.length > 0 ? (
                    <div className="product_image">
                        {productItem.images[0].name ? (
                            <ImageComponent src={productItem.images[0].name} alt={"products Image"} />) : (
                            <p>Image not available</p>
                        )}
                    </div>
                ) : (
                    <div className="product_image">
                        <ImageComponent src="https://backend.i-healthcare.ca/uploads/template_images/2024/01/laravel-c136ade819e33b5afcda41d1271d247c.webp" alt={"products Image"} />
                    </div>
                )}
                <div className="ml-3 mr-3 pt-4 customPadding">

                    <div className="d-flex mt-2 justify-content-between">

                        <div>
                            <div className={`${productItem?.price ? 'priceLabel' : 'normalPriceLabel'} sf-Bold`}>${productItem?.sell_price}</div>
                            {productItem?.quantity > 0 && productItem?.price && <span className="actualPrice sf-Regular">${productItem?.price}</span>}
                        </div>
                        <div>
                            <span className="circle mt-1" onClick={(event) => addToCart(event, productItem)}>
                                <i className="fas fa-shopping-bag mt-2"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductListing;
