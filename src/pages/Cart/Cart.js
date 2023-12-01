import React, { useState } from 'react';
import ButtonComponent from '../../components/ButtonComponents/ButtonComponents';
import { useNavigate } from 'react-router-dom';
import ImageComponent from '../../components/ImageComponents/ImageComponents';

const CartPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([
        {
            id: "trerwfdfvgds",
            imagePath: "https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
            productName: "Cipla Maxirich Omega 3 | Super Strength Capsule | EPA 500mg | DHA 350mg | Immune Booster Capsules | Supports Heart, Eye, Joint & Brain Health | 60 Capsules",
            price: "25",
            rating: "3",
            quantity: "2",
            totalPrice:"25"
        },
        {
            id: "trerwfdfvgds",
            imagePath: "https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
            productName: "Cipla Maxirich Omega 3 | Super Strength Capsule | EPA 500mg | DHA 350mg | Immune Booster Capsules | Supports Heart, Eye, Joint & Brain Health | 60 Capsules",
            price: "35",
            rating: "3",
            quantity: "5",
            totalPrice:"35"
        },
    ]);
    // const cartItems = 
    const totalItems = cartItems?.length;

    const handleNavigation = () => {
        // Handle the "Add to Cart" action
        navigate(`/`)
        console.log("Product added to cart!");
    };
    const handleIncrement = (index) => {
        const updatedCartItems = [...cartItems];
        const updatedItem = { ...updatedCartItems[index] };
        updatedItem.quantity = JSON.parse(updatedItem.quantity) + 1;
        updatedItem.totalPrice = JSON.parse(updatedItem.price) * updatedItem.quantity;
        updatedCartItems[index] = updatedItem;
        setCartItems(updatedCartItems);
    };

    const handleDecrement = (index) => {
        const updatedCartItems = [...cartItems];
        const updatedItem = { ...updatedCartItems[index] };
        updatedItem.quantity = Math.max(1, JSON.parse(updatedItem.quantity) - 1);
        updatedItem.totalPrice = JSON.parse(updatedItem.price) * updatedItem.quantity;
        updatedCartItems[index] = updatedItem;
        setCartItems(updatedCartItems);
    };
    return (
        <div className="container mt-5">
            {totalItems === 0 ? (
                <div className="empty-cart">
                    <p className='emptyCart'>Your cart is currently empty.</p>
                    <ButtonComponent onClick={handleNavigation} label="Return to Shop" />

                </div>
            ) : (
                <div className="">
                    <div className="text-center">
                        <h1 className='tex'>Your Cart  ({cartItems.length} items)</h1>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className="col-6">Item</th>
                                <th scope="col" className="col-2">Price</th>
                                <th scope="col" className="col-2">Quantity</th>
                                <th scope="col" className="col-2 text-right">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cartItems.map((item, index) => (

                                <tr key={index}>
                                    <td>
                                        <div className='row'>
                                            <div className='col-3'>
                                                <ImageComponent src={item.imagePath} alt="Product Image" classAtribute="cart-products" />
                                            </div>
                                            <div className='col-9'>
                                                <h4 className='product-name mr-3'>{item.productName}</h4>
                                            </div>

                                        </div>
                                    </td>
                                    <td className='align-middle'>{item.price}</td>
                                    <td>
                                        <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                                            <div className="quantity_selector">
                                                <span
                                                    className={
                                                        item?.quantity > 1 ? "minus" : "minus disabled"
                                                    }
                                                    onClick={() => handleDecrement(index)}
                                                >
                                                    <i className="fa fa-minus" aria-hidden="true"></i>
                                                </span>
                                                <span id="quantity_value">{item?.quantity}</span>
                                                <span
                                                    className="plus"
                                                    onClick={() => handleIncrement(index)}
                                                >
                                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='align-middle text-right'>{item?.totalPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div class=" text-right">
                        <p>Subtotal: <span className='ml-5'>37</span></p>
                        <p>Sales Tax: <span className='ml-5'>00</span></p>
                        <p>Couppon code: <span className='ml-5'>add Couppon</span></p>
                        <p>Grandtotal: <span className='ml-5'>37</span></p>
                       
                    </div>
                    <div className='row'>
                        <div className='text-right'>
                            <h6>Congrats, you'r eligible for Free <i className="fas fa-truck"></i> <br/>Shipping</h6>
                            <button class="checkout-button cart-checkout-btn" >Proceed to Checkout</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
