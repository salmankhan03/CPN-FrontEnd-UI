import React, { useEffect, useState } from "react";
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
import ReactImageMagnify from 'react-image-magnify';
import { Toast, notifySuccess, notifyError } from '../../components/ToastComponents/ToastComponents';
import FooterComponents from "../../components/FooterComponents/FooterComponents";
import AtrributeServices from "../../services/attributeServices";
// import Slider from "react-slick";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';



function ProductDetails() {
    const dispatch = useDispatch();
    const location = useLocation();
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const categoryList = useSelector(state => state.CategoryReducer.categoryListData);
    const [categoryName, setCategoryName] = useState()
    const [productData, setProductData] = useState()
    const [productID, setProductID] = useState(location?.state?.id)
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedTab, setSelectedTab] = useState('description');
    const tabNames = ['description', 'review', 'shipping'];
    const [tag, setTag] = useState([]);
    const [productsVariants, setProductsVariants] = useState([])
    const [attributes, setAttributes] = useState([])
    const [selectedOption, setSelectedOption] = useState();
    const [selectedAttributesOptions, setSelectedAttributesOptions] = useState([])
    const [chooseVariants, setChooseVariants] = useState()
    const [selectedProductsVarints, setSelectedProductVarints] = useState()
    const [startIndex, setStartIndex] = useState(0);
  

    useEffect(() => {
        if (productID) {
            getProductsDetails();
        }
    }, []);

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
            throw error; // Propagate the error
        }
    }


    function getProductsDetails() {
        ProductServices.getProductById(productID).then((resp) => {

            if (resp?.status_code === 200) {
                // console.log("res",resp.data)
                dispatch(setProductDetails({
                    ...resp.data
                }))
                // setLoading(false)
                setProductData(resp?.data)
                // console.log(resp?.data?.variants)
                if (resp?.data?.variants) {
                    let variantsData = JSON.parse(resp?.data?.variants)
                    // console.log("variantsData", variantsData)
                    for (let index = 0; index < variantsData.length; index++) {
                        const numericKeyValuePairs = Object.keys(variantsData[index]).reduce((acc, key) => {
                            if (!isNaN(key)) {
                                acc[key] = variantsData[index][key];
                            }
                            return acc;
                        }, {});
                        // console.log("numericKeyValuePairs", numericKeyValuePairs);

                        if (index === 0) {
                            setChooseVariants(numericKeyValuePairs)
                        }
                        // const transformedObj = Object.keys(numericKeyValuePairs).reduce((accumulator, currentKey, index) => {
                        //     accumulator[`id${index + 1}`] = currentKey;
                        //     accumulator[`option${index + 1}`] = numericKeyValuePairs[currentKey];
                        //     return accumulator;
                        // }, {});
                        // console.log("transformedObj", transformedObj);
                        // variantsData[index] = { ...variantsData[index], ...transformedObj };
                    }
                    // console.log("Updated variantsData", variantsData)

                    setProductsVariants(resp?.data?.variants ? variantsData : []);
                    // console.log("pp", JSON.parse(variantsData[0]?.originalPrice))
                    setAttributes(JSON.parse(resp?.data?.variants_array))


                }


                const tagsArray = resp?.data?.tags?.split(',');
                setTag(tagsArray ? tagsArray : []);
                if (resp?.data?.images.length > 0) {
                    setSelectedImage(resp?.data?.images[0]?.name)
                    // setSelectedImage("https://m.media-amazon.com/images/I/71wbxatiuDL._SX569_.jpg")

                } else {
                    setSelectedImage("https://backend.kingsmankids.com/uploads/template_images/2024/01/laravel-c136ade819e33b5afcda41d1271d247c.webp")
                }
            }
        }).catch((error) => {
            // setLoading(false)
            console.log(error)
        })
    }


   

    const handleNext = () => {
        // const newIndex = Math.min(startIndex + 1, productData?.images?.length - 1);
        const newIndex = (startIndex + 1) % productData?.images?.length;
        setStartIndex(newIndex);

        // setStartIndex(newIndex);
    };

    const handlePrev = () => {
        // const newIndex = Math.max(startIndex - 1, 0);
        const newIndex = (startIndex - 1 + productData?.images?.length) % productData?.images?.length;

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
                className={`tab tab-title  ${selectedTab === tabName ? 'active sidebar-filter-section-list' : ''}`}
                onClick={() => handleTabClick(tabName)}
            >
                {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
            </td>
        ));
    };
    const truncateString = (str, maxLength) => {
        if (str?.length <= maxLength) return str;
        return str.substr(0, maxLength) + "...";
    };
    const renderContent = () => {
        switch (selectedTab) {
            case 'description':
                return <div dangerouslySetInnerHTML={{ __html: decodeURIComponent((productData?.description === null) ? "" : productData?.description  ) }} />;
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
    const addtoCart = (product) => {
        // notifySuccess('added to the cart!');
        const existingCartItem = cartItems.find(item => item.id === product.id);
        let message = truncateString(product?.name, 60)
        if (existingCartItem) {
            const updatedCartItems = cartItems.map(item => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        purchaseQty: quantity,//item.purchaseQty +
                        totalPrice: quantity * (selectedProductsVarints ? JSON.parse(selectedProductsVarints?.sell_price) : JSON.parse(product.sell_price)),
                        price: selectedProductsVarints ? selectedProductsVarints?.sell_price : product.sell_price,
                        sku: selectedProductsVarints ? selectedProductsVarints?.sell_price : product.sku,
                    };
                } else {
                    return item;
                }
            });
            dispatch(updateCartItems(updatedCartItems));
            notifySuccess(`${message} already added in the cart!`);
            // dispatch(updateCartItems(updatedCartItems));
        } else {
            // console.log(selectedProductsVarints)
            let cartObj = {
                id: product.id,
                name: product.name,
                image: product.images,
                description: product.description,
                price: selectedProductsVarints ? selectedProductsVarints?.sell_price : product.sell_price,
                sku: selectedProductsVarints ? selectedProductsVarints?.sell_price : product.sku,
                purchaseQty: quantity,
                totalPrice: quantity * (selectedProductsVarints ? JSON.parse(selectedProductsVarints?.sell_price) : JSON.parse(product.sell_price)),
                is_tax_apply: product?.is_tax_apply
            };
            if (selectedProductsVarints) {
                cartObj['variants'] = selectedProductsVarints;
            }
            // console.log(cartObj)
            notifySuccess(`${message} added to the cart!`);
            // {truncateString(productItem?.name, 80)}
            dispatch(addtoCartItems(cartObj));
        }
    }
    const selectVarintsProducts = (id, optionID, types) => {
        // console.log("productsVariants", productsVariants)
        // console.log(id)
        // console.log("selected options", optionID)
        // console.log("chooseVariants", chooseVariants)
        let index = chooseVariants[id] === optionID
        // console.log(index)
        let updateChooseVariants = chooseVariants

        if (index !== true) {
            updateChooseVariants[id] = optionID
        } else {
            delete updateChooseVariants[id]
        }
        // console.log(chooseVariants)
        // console.log("updateChooseVariants", updateChooseVariants)
        if (types === "drop-down") {
            let index = attributes.findIndex((x) => x.id === id)
            let obj = attributes[index]?.variants?.find(item => String(item.id) === optionID)
            // console.log(obj?.name)
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
                // Convert every numeric value to a string
                newObj[key] = value.toString();
                return newObj;
            }, {});
        });
        const numericKeyValuePairsArray = convertedDatas.map(getNumericKeyValuePairs);
        const numericValueArrayStrings = numericKeyValuePairsArray.map(obj => JSON.stringify(obj));
        const chooseOptionString = JSON.stringify(updateChooseVariants);
        const matchingIndex = numericValueArrayStrings.indexOf(chooseOptionString);
        // console.log(matchingIndex);
        // console.log("productsVariants", productsVariants[matchingIndex])

        setChooseVariants(updateChooseVariants)
        setSelectedProductVarints(matchingIndex == -1 ? '' : productsVariants[matchingIndex])

        // const idKey = Object.keys(data).find(key => data[key] === String(index));
        // console.log(idKey); // This will log the key name where the value is "42", in your direct mapping example it would log "17"
        // console.log("chooseVariants", chooseVariants);

        // setChooseVariants(updateChooseVariants)

        // setProductsVariantsPrice(data?.originalPrice)
        // setProductsVariantsSellPrice(data?.sell_price)
    };

    // console.log("productsVariants", productsVariants)
    // console.log("attributes", attributes)


    return (
        <>
            <div className="container single_product_container mb-2">
                {productData && (
                    <div>
                        <div className="row">
                            <Toast />

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
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row ">
                            <div className="col-lg-5">
                                <div className="single_product_pics">
                                    <div className="row">
                                        <div className="col-lg-12 image_col order-lg-2 order-1">
                                            <div className="fluid__image-container">
                                                <ReactImageMagnify {...{
                                                    smallImage: {
                                                        alt: 'Wristwatch by Ted Baker London',
                                                        isFluidWidth: true,
                                                        src: selectedImage,
                                                    },
                                                    largeImage: {
                                                        src: selectedImage,
                                                        width: 1200,
                                                        height: 1800
                                                    },
                                                    enlargedImageContainerClassName: 'custom-enlarged-container',

                                                }} />
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
                                                                            productData?.images?.slice(startIndex, startIndex + 4).map((item, index) => (
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
                            <div className="col-lg-7">
                                <div className="product_details mt-3">
                                    <div className="product_details_title">
                                        <h3 className="product-title titleColor custom-auto-height">{productData?.name}</h3>

                                    </div>
                                    <div className="product_price priceLabelColor mt-3">
                                        ${selectedProductsVarints ? selectedProductsVarints?.sell_price : productData?.sell_price}
                                        <span className="ml-2">${selectedProductsVarints ? selectedProductsVarints?.originalPrice : productData?.price}</span>
                                    </div>
                                    {/* <div className="product_rating mt-3">
                                    <RatingComponents rating={productData.rating} />
                                </div> */}
                                    {productsVariants?.length > 0 && chooseVariants ? (
                                        <>
                                            <div className="mt-3 ">
                                                Stock: {selectedProductsVarints ? selectedProductsVarints?.quantity : "Out of Stock"}
                                            </div>
                                            {!selectedProductsVarints ? (
                                                <div className="mt-1 validation-error">
                                                    This Variants Not Available
                                                </div>
                                            ) : null}
                                            {selectedAttributesOptions?.map((z, index) => {
                                                // console.log("xx", z)
                                                // console.log("productsVariants 374", productsVariants)
                                                // console.log("selectedAttributesOptions", selectedAttributesOptions)
                                                return (
                                                    <React.Fragment key={index}>

                                                        <div className="mt-3 ">
                                                            {attributes[index]?.title}:
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
                                                                            <React.Fragment key={option?.name}>
                                                                                {index !== -1 ? (
                                                                                    <option key={option?.name} value={option?.id} name={z?.options[k]}>{option?.name}</option>
                                                                                ) : null}
                                                                            </React.Fragment>
                                                                        );
                                                                    })}
                                                                </select>
                                                            ) : (
                                                                <React.Fragment >
                                                                    {attributes[index]?.variants?.map((i, l) => {
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
                                                    </React.Fragment>
                                                )
                                            })}
                                        </>
                                    ) : null}
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

                                        <div className={`red_button product-add_to_cart_button ml-2 ${productsVariants?.length > 0 && !selectedProductsVarints ? 'disabled' : ''}`}
                                            onClick={() => {
                                                if (productsVariants?.length) {
                                                    if (selectedProductsVarints) {
                                                        addtoCart(productData);
                                                    }
                                                } else {
                                                    addtoCart(productData);
                                                }
                                            }}

                                        >
                                            add to cart
                                        </div>
                                    </div>
                                    <div className="mt-3 brandLabel">
                                        SKU: <span className="ml-2">{selectedProductsVarints ? selectedProductsVarints?.sku : productData?.sku}</span>
                                    </div>
                                    <div className="mt-3 brandLabel">
                                        Category: <span className="ml-2">{categoryName ? categoryName : "Category Not Found"}</span>
                                    </div>
                                    {tag?.length > 0 &&
                                        <div className="product-tags-container mt-3 brandLabel">
                                            Tags:
                                            <ProductTags tags={tag} />
                                        </div>
                                    }
                                    <div className="mt-3 brandLabel">
                                        Brand: <span className="ml-2">{productData?.brand}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5" >
                            <table className="product-details-table mt-2">
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
            <div>
                <FooterComponents />
                {/* <Header/> */}
            </div>
        </>
    );
}

export default ProductDetails;
