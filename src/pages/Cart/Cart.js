import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import ButtonComponent from '../../components/ButtonComponents/ButtonComponents';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const navigate = useNavigate();

    const cartItems = [
        { 
            id :"trerwfdfvgds",
            imagePath:"https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
            productName:"Cipla Maxirich Omega 3 | Super Strength Capsule | EPA 500mg | DHA 350mg | Immune Booster Capsules | Supports Heart, Eye, Joint & Brain Health | 60 Capsules",
            price:"35",
            rating:"3",
            quantity:"2"
        },
        {
            id :"trerwfdfvgds",
            imagePath:"https://m.media-amazon.com/images/I/41T+9XsJd5L._SY300_SX300_.jpg",
            productName:"Cipla Maxirich Omega 3 | Super Strength Capsule | EPA 500mg | DHA 350mg | Immune Booster Capsules | Supports Heart, Eye, Joint & Brain Health | 60 Capsules",
            price:"35",
            rating:"3", 
            quantity:"5"
        },
        ];
    const totalItems = cartItems?.length;

    const handleNavigation = () => {
        // Handle the "Add to Cart" action
        navigate(`/`)
        console.log("Product added to cart!");
    };
    return (
        <div className="container mt-5">
            {totalItems === 0 ? (
                <div className="empty-cart">
                    <p className='emptyCart'>Your cart is currently empty.</p>
                    <ButtonComponent onClick={handleNavigation} label="Return to Shop" />

                </div>
            ) : (
                // <div className="cart-items">
                //     {cartItems.map((item) => (
                //         <div key={item.id} className="cart-item">
                            
                //             <p>{item.name}</p>
                //             <p>Quantity: {item.quantity}</p>
                //         </div>
                //     ))}
                //     <div className="cart-summary">
                //         <p>Total Items: {totalItems}</p>
                //     </div>
                // </div>
                <div class="cart-container">
                <h1>Your Shopping Cart</h1>
                <hr></hr>
                {cartItems.map((item) => (
                <div class="cart-item">
                  <img src={item.imagePath} alt="Product Image" />
                  <div class="item-details">
                    <h2 className='product-name'>{item.productName}</h2>
                    <p>Price:  {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button class="remove-button">Remove</button>
                  </div>
                </div>
                ))}
            
                <div class="cart-summary">
                  <h2>Order Summary</h2>
                  <p>Total Items: 3</p>
                  <p>Total Price: $63.97</p>
                  <button class="checkout-button">Proceed to Checkout</button>
                </div>
              </div>
            )}
        </div>
    );
};

export default CartPage;
