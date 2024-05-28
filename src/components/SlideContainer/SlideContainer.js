import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./index.css"
import { useNavigate } from 'react-router-dom';
import ImageComponent from '../ImageComponents/ImageComponents';
import { useDispatch, useSelector } from 'react-redux';
import { notifySuccess } from '../ToastComponents/ToastComponents';
import { addtoCartItems } from '../../redux/action/cart-action';


const SlideContainer = ({ categories, onSelectCategory, selectedCategory }) => {
    const slidesToShow = Math.min(categories.length, 4);
    const settings = {
        dots: false,
        infinite: true,
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
                    slidesToShow: Math.min(categories.length, 2),
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

    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const navigate = useNavigate();
    const dispatch = useDispatch();

 
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
    return (
        <Slider {...settings}>
            {categories.map((category,index) => (
                
                <div key={index} className=""
                    onClick={() => navigate(`/products-details/${category.id}`, { state: { id: category.id } })}>

                    <div className="product-details category-item product-card p-4 m-2">
                        <p className='brandLabel inter-medium-fonts'>{category?.brand}</p>
                        <h3 className="product-title secondaryColor">{truncateString(category?.name, 70)}</h3>
                        <div className="product_image mb-3">
                            {category?.images[0]?.name ? (
                                <ImageComponent src={category?.images[0]?.name} alt="products Image" />
                            ) : (
                                <p className='inter-medium-fonts'>Image not available</p>
                            )}
                        </div>
                        <div className="d-flex mt-2 justify-content-between">
                            <div className='priceLabel'>${category?.sell_price}</div>
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
    );
};

export default SlideContainer;
