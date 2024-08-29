import React, { useEffect, useRef, useState } from "react";
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
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toast, notifySuccess, notifyError } from '../../components/ToastComponents/ToastComponents';
import FooterComponents from "../../components/FooterComponents/FooterComponents";
import AtrributeServices from "../../services/attributeServices";
import { Tabs, Tab, Row, Col, Container } from 'react-bootstrap';
import Loading from "../../components/LoadingComponents/LoadingComponents";
import { useNavigate } from 'react-router-dom';
import SpinnerLoading from "../../components/SpinnerComponents/SpinnerLoader";
import MetaTitle from "../../components/HelmetComponent/MetaTitle";
import { gsap } from 'gsap';
import Modal from 'react-bootstrap/Modal';
import Header from "../../components/HeaderComponents/HeaderComponents";
import ButtonComponent from "../../components/ButtonComponents/ButtonComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";


const useSlidesToShow = () => {
    const [slidesToShow, setSlidesToShow] = useState(1);

    const updateSlidesToShow = () => {
        const width = window.innerWidth;
        if (width >= 1680) {
            setSlidesToShow(4);
        }
        else if (width >= 1440) {
            setSlidesToShow(4);
        }
        else if (width >= 992) {
            setSlidesToShow(3);
        } else if (width >= 768) {
            setSlidesToShow(2);
        } else if (width >= 576) {
            setSlidesToShow(1);
        } else {
            setSlidesToShow(1);
        }
    };

    useEffect(() => {
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    return slidesToShow;
};

function ProductDetails() {
    const dispatch = useDispatch();
    const location = useLocation();
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const categoryList = useSelector(state => state.CategoryReducer.categoryListData);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState()
    const [productData, setProductData] = useState()
    const [productID, setProductID] = useState(location?.state?.id)
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedTab, setSelectedTab] = useState('description');
    const [activeKey, setActiveKey] = useState('description');
    const tabNames = ['description', 'review', 'shipping'];
    const [tag, setTag] = useState([]);
    const [productsVariants, setProductsVariants] = useState([])
    const [attributes, setAttributes] = useState([])
    const [selectedOption, setSelectedOption] = useState();
    const [selectedAttributesOptions, setSelectedAttributesOptions] = useState([])
    const [chooseVariants, setChooseVariants] = useState()
    const [selectedProductsVarints, setSelectedProductVarints] = useState()
    const [startIndex, setStartIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState('none');
    const [relatedProduct, setRelatedProduct] = useState()
    const [relatedProductLoader, setRelatedProductLoader] = useState(false)
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const tabContentRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const tabContent = tabContentRef.current;

        gsap.fromTo(tabContent,
            { height: 'auto', opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
    }, [activeKey]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.closest('.slick-arrow')) {
                setShow(false);
            }
        };

        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show, setShow]);

    const relatedProductSlidesToShow = Math.min(relatedProduct?.length, useSlidesToShow());

    const pathURL = window.location.pathname
    const splitURL = pathURL.split('/')
    const productId = splitURL[splitURL.length - 1];
    const relatedSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: relatedProductSlidesToShow,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: relatedProductSlidesToShow,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(relatedProductSlidesToShow?.length, 2),
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

    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);
        if (productId) {
            fetchData();
        }
    }, []);
    useEffect(() => {
        if (location.state?.id) {
            setLoading(true)
            window.scrollTo(0, 0);
            getProductsDetails(location.state?.id)
        }
    }, [location.state]);



    const fetchData = async () => {
        try {
            await Promise.all([
                getProductsDetails(productId)
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        } finally {
            const timers = setTimeout(() => {
                setLoading(false);
            }, 500)
            return () => clearTimeout(timers);
        }
    };

    useEffect(() => {
        let showOptionsArray = []
        const fetchAttributeData = async () => {
            let updatedAtrributes = []
            for (let index = 0; index < attributes?.length; index++) {
                const id = attributes[index]?.id;
                try {
                    const data = await getAttributes(id);
                    let newAtrributes = attributes[index]
                    newAtrributes['option'] = data?.attribute?.option
                    newAtrributes['variants'] = data?.attribute?.variants;
                    const selectedOptions = productsVariants.map((obj) => obj[id]);
                    const stringifiedArr = selectedOptions.map(element => String(element));
                    const obj = { attributeID: id, options: stringifiedArr, selectedOptions: '' };
                    showOptionsArray.push(obj);
                    updatedAtrributes.push(newAtrributes)
                } catch (error) {
                    console.error(error);
                }
            }
            setSelectedAttributesOptions(showOptionsArray);
            const selectedVariant = productsVariants.find(variant => {
                return Object.entries(chooseVariants).every(([key, value]) => variant[key] === value);
            });
            setSelectedProductVarints(selectedVariant);
        };

        fetchAttributeData();
    }, [productsVariants])

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
    async function getAttributes(id) {
        try {
            const resp = await AtrributeServices.getAttributeById(id);
            console.log(resp);
            return resp;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    function getProductsDetails(id) {
        setRelatedProductLoader(true)

        ProductServices.getProductById(id).then((resp) => {
            if (resp?.status_code === 200) {
                dispatch(setProductDetails({
                    ...resp.data
                }))
                if (resp?.data?.images.length > 0) {
                    setSelectedImage(resp?.data?.images[0]?.name)

                } else {
                    setSelectedImage("https://backend.i-healthcare.ca/uploads/template_images/2024/01/laravel-c136ade819e33b5afcda41d1271d247c.webp")
                }
                setProductData(resp?.data)
                setRelatedProduct(resp?.data.relatedProducts)

                if (resp?.data?.variants) {
                    let variantsData = JSON.parse(resp?.data?.variants)
                    for (let index = 0; index < variantsData.length; index++) {
                        const numericKeyValuePairs = Object.keys(variantsData[index]).reduce((acc, key) => {
                            if (!isNaN(key)) {
                                acc[key] = variantsData[index][key];
                            }
                            return acc;
                        }, {});

                        if (index === 0) {
                            setChooseVariants(numericKeyValuePairs)
                        }
                    }
                    setProductsVariants(resp?.data?.variants ? variantsData : []);
                    setAttributes(JSON.parse(resp?.data?.variants_array))
                }
                // let tagsArray = [];
                // console.log("tags", resp?.data?.tags)
                // if (resp?.data?.tags) {
                //     try {
                //         tagsArray = JSON.parse(resp?.data?.tags);
                //     } catch (error) {
                //         tagsArray = resp?.data?.tags?.split(',');
                //     }
                // }

                // const orderedTags = [];

                // if (tagsArray) {
                //     tagsArray.forEach(tag => {
                //         orderedTags.push(tag?.name.trim());
                //     });
                // }

                setTag(resp?.data?.tags);

                const timers = setTimeout(() => {
                    setLoading(false)
                    setRelatedProductLoader(false)

                }, 500)
                return () => clearTimeout(timers);
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleThumbnailClick = (imagePath) => {
        setSlideDirection(selectedImage < imagePath ? 'right' : 'left');
        setSelectedImage(imagePath);
    };

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const truncateString = (str, maxLength) => {
        if (str?.length <= maxLength) return str;
        return str.substr(0, maxLength) + "...";
    };

    const addtoCart = (product) => {
        console.log("ADD TO CART CALL")
        const existingCartItem = cartItems.find(item => item?.id === product?.id);
        let message = truncateString(product?.name, 60)
        if (existingCartItem) {
            if ((existingCartItem?.purchaseQty + quantity) <= product?.quantity) {
                const updatedCartItems = cartItems.map(item => {
                    if (item.id === product.id) {
                        return {
                            ...item,
                            purchaseQty: quantity + item?.purchaseQty,
                            totalPrice: (quantity + item?.purchaseQty) * (selectedProductsVarints ? JSON.parse(selectedProductsVarints?.sell_price) : JSON.parse(product.sell_price)),
                            price: selectedProductsVarints ? selectedProductsVarints?.sell_price : product.sell_price,
                            sku: selectedProductsVarints ? selectedProductsVarints?.sell_price : product.sku,
                            availableQty: product?.quantity
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
            if (quantity <= Number(product?.quantity)) {
                let cartObj = {
                    id: product.id,
                    name: product.name,
                    image: product.images,
                    description: product.description,
                    price: selectedProductsVarints ? selectedProductsVarints?.sell_price : product.sell_price,
                    sku: selectedProductsVarints ? selectedProductsVarints?.sell_price : product.sku,
                    purchaseQty: quantity,
                    totalPrice: quantity * (selectedProductsVarints ? JSON.parse(selectedProductsVarints?.sell_price) : JSON.parse(product.sell_price)),
                    is_tax_apply: product?.is_tax_apply,
                    availableQty: product?.quantity
                };
                if (selectedProductsVarints) {
                    cartObj['variants'] = selectedProductsVarints;
                }
                notifySuccess(`${message} added to the cart!`);
                dispatch(addtoCartItems(cartObj));
            } else {
                notifyError(`Products Quantity not Sufficient`);
            }
        }
    }
    const selectVarintsProducts = (id, optionID, types) => {

        let index = chooseVariants[id] === optionID
        let updateChooseVariants = chooseVariants
        if (index !== true) {
            updateChooseVariants[id] = optionID
        } else {
            delete updateChooseVariants[id]
        }

        if (types === "drop-down") {
            let index = attributes.findIndex((x) => x.id === id)
            let obj = attributes[index]?.variants?.find(item => String(item.id) === optionID)
            setSelectedOption(obj?.name);
        }

        const getNumericKeyValuePairs = (obj) => {
            const numericPairs = {};
            for (const [key, value] of Object.entries(obj)) {
                if (!isNaN(key) && !isNaN(value)) {
                    numericPairs[key] = value;
                }
            }
            return numericPairs;
        };

        const convertedDatas = productsVariants.map(obj => {
            return Object.entries(obj).reduce((newObj, [key, value]) => {
                newObj[key] = value.toString();
                return newObj;
            }, {});
        });
        const numericKeyValuePairsArray = convertedDatas.map(getNumericKeyValuePairs);
        const numericValueArrayStrings = numericKeyValuePairsArray.map(obj => JSON.stringify(obj));
        const chooseOptionString = JSON.stringify(updateChooseVariants);
        const matchingIndex = numericValueArrayStrings.indexOf(chooseOptionString);
        setChooseVariants(updateChooseVariants)
        setSelectedProductVarints(matchingIndex == -1 ? '' : productsVariants[matchingIndex])
    };

    const numImages = productData?.images.length || 0;
    const slidesToShow = numImages >= 3 ? 3 : numImages;
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(3, numImages),
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(2, numImages),
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: Math.min(1, numImages),
                },
            },
        ],
    };

    const modalSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        const img = document.querySelector('.fluid__image-container img');
        if (img) {
            img.style.maxHeight = '-webkit-fill-available';
        }
    }, [selectedImage]);

    const renderSlider = () => {
        if (numImages === 0) {
        } else if (numImages === 1) {
            const image = productData.images[0];
            return (
                <div className="thumbnail" onClick={() => handleThumbnailClick(image.name)} onMouseEnter={() => setSelectedImage(image.name)}>
                    <div className={`thumbnail-image ${selectedImage === image.name ? 'selected' : ''}`}>
                        <img src={image.name} alt={`Product Image 0`} className="product-image" />
                    </div>
                </div>
            );
        } else if (numImages === 2) {
            const image = productData.images[0];
            return (
                <div style={{ display: 'flex' }}>
                    {productData.images.map((item, index) => (
                        <div className="thumbnail" key={index} onClick={() => handleThumbnailClick(item.name)} onMouseEnter={() => setSelectedImage(item.name)}>
                            <div className={`thumbnail-image ${selectedImage === item.name ? 'selected' : ''}`}>
                                <img src={item.name} alt={`Product Image 0`} className="product-image" />
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <Slider {...settings}>
                    {productData.images.map((item, index) => (
                        <div key={index} className="thumbnail">
                            <div
                                onClick={() => handleThumbnailClick(item.name)}
                                onMouseEnter={() => setSelectedImage(item.name)}
                                className={`thumbnail-image ${selectedImage === item.name ? 'selected' : ''}`}
                            >
                                <img src={item.name} alt={`Product Image ${index}`} className="product-image" />
                            </div>
                        </div>
                    ))}
                </Slider>
            );
        }
    };

    const renderModelSlider = () => {
        if (!productData || !productData.images || productData.images.length === 0) {
            return <div>No images available</div>;
        }

        const selectedIndex = productData?.images.findIndex(item => item.name === selectedImage);

        const reorderedImages = selectedIndex !== -1
            ? [
                productData.images[selectedIndex],
                ...productData.images.slice(0, selectedIndex),
                ...productData.images.slice(selectedIndex + 1)
            ]
            : productData.images;

        const sliderSettings = productData.images.length === 1
            ? { ...modalSettings, infinite: false, arrows: false }
            : modalSettings;

        return (
            <Slider {...sliderSettings} style={{ display: 'block' }} className={"productImageModalSlider"} >
                {reorderedImages.map((item, index) => (
                    <div key={index} className="thumbnail" ref={modalRef}>
                        <div
                            onClick={() => handleThumbnailClick(item.name)}
                            onMouseEnter={() => setSelectedImage(item.name)}
                        >
                            <img src={item.name} alt={`Product Image ${index}`} style={{ height: 'calc(100vh - 100px)', borderRadius: 10, width: 'auto' }} className="product-image" />
                        </div>
                    </div>
                ))}
            </Slider>
        );

    };





    const relatedAddToCart = (event, productItem) => {
        event.stopPropagation();
        const existingCartItem = cartItems.find(item => item.id === productItem.id);
        let message = truncateString(productItem?.name, 60)
        if (existingCartItem) {
            const updatedCartItems = cartItems.map(item => {
                if (item.id === productItem.id) {
                    return {
                        ...item,
                        purchaseQty: 1 + item?.purchaseQty,
                        totalPrice: (1 + item?.purchaseQty) * JSON.parse(productItem?.sell_price),
                        price: productItem.sell_price,
                        sku: productItem.sku,
                    };
                } else {
                    return item;
                }
            });
            dispatch(updateCartItems(updatedCartItems));
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
    const getDetails = (data) => {
        console.log(data);
        navigate(`/products-details/${data}`, {
            state: {
                id: data
            }
        })
    }

    const handleShow = () => {
        setShow(true);
    };


    if (loading) {
        return <SpinnerLoading loading={loading} />
    }
    return (
        <>
            <Header />
            <Modal className={'ProductImageHeader'} show={show} fullscreen={true} onHide={() => setShow(false)}>
                {/*<Modal.Header className="custom-modal-header">*/}
                {/*    <Modal.Title>Product Image</Modal.Title>*/}
                {/*</Modal.Header>*/}
                <Modal.Body className={"productImageModal"}>{renderModelSlider()}</Modal.Body>
            </Modal>
            <MetaTitle pageTitle={productData?.name} />
            {productData && (
                <div className="" style={{ backgroundColor: '#F8F8F8' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="breadcrumbs d-flex flex-row align-items-center mt-0 mb-0">
                                    <ul className="mb-0">
                                        <li>
                                            <a href="/">Home</a>
                                        </li>
                                        <li>
                                            <a href={`/shop?name=brand&id=${productData.brand_id}`}>
                                                <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                {productData?.brand}
                                            </a>
                                        </li>
                                        <li>
                                            <a href={`/products-details/${productData?.id}`}>
                                                <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                {truncateString(productData?.name, 70)}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="container single_product_container border-bottom-0 pb-0 mt-5">
                {productData && (
                    <div>
                        {/* <div className="row" style={{backgroundColor:'#F8F8F8'}}>
                            <div className="col">
                                <div className="breadcrumbs d-flex flex-row align-items-center mt-2 mb-2">
                                    <ul>
                                        <li>
                                            <a href="/">Home</a>
                                        </li>
                                        <li>
                                            <a href={`/shop?name=brand&id=${productData.brand_id}`}>
                                                <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                {productData?.brand}
                                            </a>
                                        </li>
                                        <li>
                                            <a href={`/products-details/${productData?.id}`}>
                                                <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                {truncateString(productData?.name, 70)}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div> */}

                        <div className="row ">
                            <div className="col-lg-5">
                                <div className="single_product_pics">
                                    <div className="row">
                                        <div className="col-lg-12 image_col order-lg-2 order-1">
                                            <div className="fluid__image-container">
                                                <img src={selectedImage} onClick={handleShow} style={{ width: '275px', height: '350px', cursor: 'pointer', objectFit: 'contain' }} alt={'Product Image'} />

                                                {/*<ReactImageMagnify {...{*/}
                                                {/*    smallImage: {*/}
                                                {/*        alt: 'Wristwatch by Ted Baker London',*/}
                                                {/*        isFluidWidth: true,*/}
                                                {/*        src: selectedImage,*/}
                                                {/*        style: {*/}
                                                {/*            width: '100%', // Set the desired width*/}
                                                {/*            height: 'auto',*/}
                                                {/*            display: 'block',*/}
                                                {/*            pointerEvents: 'none',*/}
                                                {/*        }*/}
                                                {/*    },*/}
                                                {/*    largeImage: {*/}
                                                {/*        src: selectedImage,*/}
                                                {/*        width: 1200,*/}
                                                {/*        height: 1800*/}
                                                {/*    },*/}
                                                {/*    enlargedImageContainerClassName: 'custom-enlarged-container',*/}
                                                {/*}} />*/}
                                            </div>

                                            <div className="single_product_thumbnail">
                                                <div className="thumbnail-container" >
                                                    {renderSlider()}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 mt-4">
                                <div className="product_details mt-4 ml-5 mr-5">
                                    <div className="mb-3 ">
                                        <a className="entry-product-categories" href={`/shop?name=brand&id=${productData.category?.id}`}>
                                            {productData?.category?.name}
                                        </a>
                                    </div>
                                    {/* <div className="product_details_title">
                                        <h3 className="product-title text-left titleColor custom-auto-height" style={{ fontSize: '25px' }}>{productData?.name}</h3>
                                    </div> */}
                                    <h1 className="entry-title text-left">{productData?.name}</h1>
                                    <div className="mt-3 productDetailBrandLabel mb-3">
                                        Brands:  <a className="" href={`/shop?name=brand&id=${productData.brand_id}`}>
                                            {productData?.brand}
                                        </a>
                                    </div>
                                    <div style={{ borderTop: '1px solid #eee', width: '100%', display: 'flex' }}>
                                        <div className=" mt-3 mb-3">
                                            <span className="product_price priceLabelColor"> ${selectedProductsVarints ? selectedProductsVarints?.sell_price : productData?.sell_price} </span>
                                            {productData?.quantity > 0 && <span className="ml-2 actualPrice sf-Regular">${selectedProductsVarints ? selectedProductsVarints?.originalPrice : productData?.price}</span>}
                                        </div>
                                    </div>
                                    {Number(productData?.quantity) === 0 &&
                                        <div className="mt-3 mb-3">
                                            <span class="out-of-stock"> {productData && productData.quantity > 0 ? productData.quantity : "Out of Stock"} </span>
                                        </div>
                                    }
                                    {/* <div className="product_rating mt-3">
                                    <RatingComponents rating={productData.rating} />
                                </div> */}
                                    {productsVariants?.length > 0 && chooseVariants ? (
                                        <>
                                            <div className="mt-3 mb-3 ">
                                                Stock: {selectedProductsVarints ? selectedProductsVarints?.quantity : "Out of Stock"}
                                            </div>
                                            {!selectedProductsVarints ? (
                                                <div className="mt-1 validation-error text-left">
                                                    This Variants Not Available
                                                </div>
                                            ) : null}
                                            {selectedAttributesOptions?.map((z, index) => {
                                                // console.log("xx", z)
                                                // console.log("productsVariants 374", productsVariants)
                                                // console.log("selectedAttributesOptions", selectedAttributesOptions)
                                                return (
                                                    <React.Fragment key={index}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div className="mt-3 ">
                                                                <label style={{ minWidth: '100px', display: 'inline-flex' }}>{attributes[index]?.title}:</label>
                                                            </div>

                                                            <div className="mt-2 d-flex  flex-sm-row align-items-sm-center" >
                                                                {attributes[index]?.option !== "Radio" ? (

                                                                    <select
                                                                        id="simpleDropdown"
                                                                        defaultValue={selectedOption}
                                                                        onChange={(event) =>
                                                                            selectVarintsProducts(z?.attributeID, event.target.value, "drop-down")
                                                                        }
                                                                        className='select-dropdown'
                                                                    >
                                                                        {attributes[index]?.variants?.map((option, k) => {
                                                                            let ids = String(option?.id);
                                                                            let index = z?.options?.findIndex((xy) => xy === ids)

                                                                            return (
                                                                                <React.Fragment key={k}>
                                                                                    {index !== -1 ? (
                                                                                        <option key={option?.name} value={option?.id} name={z?.options[k]}>{option?.name}</option>
                                                                                    ) : null}
                                                                                </React.Fragment>
                                                                            );
                                                                        })}
                                                                    </select>
                                                                ) : (
                                                                    <React.Fragment>
                                                                        {attributes[index]?.title === "Color" ? (
                                                                            <div className="color-options">
                                                                                {attributes[index]?.variants?.map((i, l) => {
                                                                                    let ids = String(i?.id);
                                                                                    let index = z?.options?.findIndex((xy) => xy === ids);
                                                                                    const keyFound = Object.keys(chooseVariants).find(key => chooseVariants[key] === String(i?.id));

                                                                                    return (
                                                                                        <React.Fragment key={l}>
                                                                                            {index !== -1 ? (
                                                                                                <div className={`color-circle ${keyFound !== undefined ? "selected" : ""}`}>
                                                                                                    <span
                                                                                                        className={`color-circles`}
                                                                                                        style={{ backgroundColor: i?.name, margin: '2px' }}
                                                                                                        onClick={() => selectVarintsProducts(i?.product_attribute_id, ids, "radio")}
                                                                                                    >
                                                                                                    </span>
                                                                                                </div>
                                                                                            ) : null}
                                                                                        </React.Fragment>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        ) : attributes[index]?.title === "Size" ? (
                                                                            <div className="size-options">
                                                                                {attributes[index]?.variants?.map((i, l) => {
                                                                                    let ids = String(i?.id);
                                                                                    let index = z?.options?.findIndex((xy) => xy === ids);
                                                                                    const keyFound = Object.keys(chooseVariants).find(key => chooseVariants[key] === String(i?.id));

                                                                                    return (
                                                                                        <React.Fragment key={l}>
                                                                                            {index !== -1 ? (
                                                                                                <div className={`color-circle ${keyFound !== undefined ? "selected" : ""}`}>
                                                                                                    <span
                                                                                                        className={`color-circles`}
                                                                                                        onClick={() => selectVarintsProducts(i?.product_attribute_id, ids, "radio")}
                                                                                                        style={{ backgroundColor: '#F5F5F5', margin: '2px' }}
                                                                                                    >
                                                                                                        {i?.name}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ) : null}
                                                                                        </React.Fragment>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        ) : attributes[index]?.variants?.map((i, l) => {
                                                                            let ids = String(i?.id)
                                                                            let index = z?.options?.findIndex((xy) => xy === ids)
                                                                            const keyFound = Object.keys(chooseVariants).find(key => chooseVariants[key] === String(i?.id));
                                                                            return (
                                                                                <React.Fragment key={l}>
                                                                                    {index !== -1 ? (
                                                                                        <div
                                                                                            className={`ml-2 mr-2 pointer-on-hover variantsButton ${keyFound !== undefined ? "secondaryBGColor" : "lightGrayBGColor"
                                                                                                }`}
                                                                                            onClick={() => selectVarintsProducts(i?.product_attribute_id, ids, "radio")}//selectVarintsProducts(productsVariants[l], z?.options[l])
                                                                                        >
                                                                                            {i?.name}
                                                                                        </div>
                                                                                    ) : null}
                                                                                </React.Fragment>

                                                                            )
                                                                        })}
                                                                    </React.Fragment>
                                                                )}

                                                            </div>
                                                        </div>

                                                    </React.Fragment>
                                                )
                                            })}
                                        </>
                                    ) : null}
                                    <div className='' style={{ borderBottom: '1px solid #eee', width: '100%' }}>
                                        <div className='d-flex align-items-center justify-content-start flex-column flex-sm-row' style={{ marginBottom: '30px' }}>
                                            <div className="d-flex align-items-center flex-column flex-sm-row">
                                                <div className="quantity d-flex align-items-center ml-0 mt-3 mt-sm-0">
                                                    <span className="mr-3 mt-2">Quantity:</span>
                                                    <div className="quantity_selector d-flex align-items-center">
                                                        <span
                                                            className={productData?.quantity > 1 ? "minus" : "minus disabled"}
                                                            onClick={handleDecrement}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            <i className="fa fa-minus" aria-hidden="true"></i>
                                                        </span>
                                                        <span id="quantity_value" className="mx-3">{quantity}</span>
                                                        <span
                                                            className="plus"
                                                            onClick={handleIncrement}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start flex-column flex-sm-row mt-3 mt-sm-0 ml-sm-3">
                                                <p className="m-0">  
                                                    <FontAwesomeIcon icon={faCircleCheck} fontSize={20} className="mr-2 qtyCheckButton"  />
                                                    {productData?.quantity} in Stock
                                                </p>
                                            </div>
                                            <ButtonComponent
                                                cssClass={`shopping-btn btn-border-radius w-auto mt-3 mt-sm-0 ml-sm-5 ${productsVariants?.length > 0 && !selectedProductsVarints || Number(productData?.quantity) === 0 ? 'disabled' : ''}`}
                                                onClick={() => {
                                                    if (productsVariants?.length) {
                                                        if (selectedProductsVarints) {
                                                            addtoCart(productData);
                                                        }
                                                    } else {
                                                        if (Number(productData?.quantity) > 0) {
                                                            addtoCart(productData);
                                                        }
                                                    }
                                                }}
                                                label="Add to Cart"
                                            />
                                        </div>


                                    </div>
                                    <div className="mt-4 brandLabel">
                                        <label style={{ minWidth: '100px', display: 'inline-flex' }}>SKU:</label> <span className="ml-2">{selectedProductsVarints ? selectedProductsVarints?.sku : productData?.sku}</span>
                                    </div>
                                    <div className="mt-3 brandLabel">
                                        <label style={{ minWidth: '100px', display: 'inline-flex' }}>Category:</label> <span className="ml-2">{categoryName ? categoryName : "Category Not Found"}</span>
                                    </div>
                                    {tag?.length > 0 &&
                                        <div className="product-tags-container mt-3 brandLabel">
                                            <label style={{ minWidth: '100px', display: 'inline-flex' }}>Tags:</label>
                                            <ProductTags tags={tag} />
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="row marginTopBottom product-detail mt-5">
                            <Container className="mt-4">
                                <Tabs
                                    id="tab-component"
                                    className="custom-tabs"
                                    activeKey={activeKey}
                                    onSelect={(k) => setActiveKey(k)}
                                >
                                    <Tab eventKey="description" title="Description">
                                        <div className="tab-content-custom" ref={tabContentRef}>
                                            <div className='tab-content-custom-peragraph tab-content-custom-paragraph-word-wrap' dangerouslySetInnerHTML={{ __html: decodeURIComponent((productData?.description === null) ? "" : productData?.description) }} />
                                        </div>
                                    </Tab>
                                    <Tab eventKey="reviews" title="Reviews (0)">
                                        <div className="tab-content-custom" ref={tabContentRef}>
                                            <p>No reviews yet.</p>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="shipping" title="Shipping">
                                        <div className="tab-content-custom" ref={tabContentRef}>
                                            <p>For any enquiries, please contact us.</p>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </Container>
                            {/* <div>
                                <h3 class="entry-product-section-heading product-description-heading text-left">Description</h3>
                            </div>
                            <div className='tab-content-custom-peragraph tab-content-custom-paragraph-word-wrap' dangerouslySetInnerHTML={{ __html: decodeURIComponent((productData?.description === null) ? "" : productData?.description) }} /> */}

                        </div>
                    </div>
                )}

                <div className="product-list-container marginTopBottom">
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-12">
                            <div className="d-flex align-items-center">
                                <div className="mr-auto">
                                    <h5 className="bold pointer-on-hover title d-inline">Related products</h5>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-3 recentProduct">

                        {relatedProductLoader ? (
                            <div className='d-flex justify-content-center'>
                                <Loading loading={relatedProductLoader} />
                            </div>
                        ) : (
                            relatedProduct?.length > 0 ? (
                                <div className="" >
                                    <Slider {...relatedSettings}>
                                        {relatedProduct.map((item, index) => (
                                            <div key={index} className=" product-slide" onClick={() => getDetails(item?.id)}>
                                                <div className="product-details category-item product-card p-4 m-2">
                                                    <p className="brandLabel sf-Regular">{item?.brand}</p>
                                                    <h3 className="product-title secondaryColor sf-Medium font-weight-normal">{truncateString(item?.name, 70)}</h3>

                                                    <div className="product_image mb-3">
                                                        {item?.images[0]?.name ? (
                                                            <ImageComponent src={item?.images[0]?.name} alt="products Image" />
                                                        ) : (
                                                            <p className="inter-medium-fonts">Image not available</p>
                                                        )}
                                                    </div>
                                                    <div className="d-flex mt-2 justify-content-between">
                                                        <div>
                                                            <div className={`${item?.price ? 'priceLabel' : 'normalPriceLabel'} sf-Bold`}>${item?.sell_price}</div>
                                                            {item?.price && <span className="actualPrice sf-Regular">${item?.price}</span>}
                                                        </div>
                                                        <div>
                                                            <span className="circle" onClick={(event) => relatedAddToCart(event, item)}>
                                                                <i className="fas fa-shopping-bag mt-2"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            ) : (
                                <div className='d-flex justify-content-center'>
                                    <h4 className='text-center inter-medium-fonts'>No products available</h4>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className='pb-2'>
                    <FooterComponents />
                </div>
            </div>

        </>
    );
}

export default ProductDetails;
