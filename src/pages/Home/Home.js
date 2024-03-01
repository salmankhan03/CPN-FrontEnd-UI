import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from "../../assets/images/banner/banner1.jpg";
import banner2 from "../../assets/images/banner/banner2.jpg";
import banner3 from "../../assets/images/banner/banner3.jpg";
import ImageComponent from '../../components/ImageComponents/ImageComponents';
import { useDispatch, useSelector } from 'react-redux';
import { notifySuccess } from "../../components/ToastComponents/ToastComponents";
import { addtoCartItems } from '../../redux/action/cart-action';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function HomeScreen() {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const dispatch = useDispatch();
    const [scrollLeft, setScrollLeft] = useState(0);
    const scrollContainerRef = useRef(null);

    const [cardsPerRow, setCardsPerRow] = useState(3);
    const cardWidth = 250; // Width of each product card



    const products = [
        {
            "id": 58,
            "name": "California Gold Nutrition, CollagenUP, Hydrolyzed Marine Collagen Peptides with Hyaluronic Acid and Vitamin C, Unflavored, 7.26 oz (206 g)",
            "price": "25.00",
            "bar_code": "CGN-01033",
            "description": "%3Cul%3E%3Cli%3EGenuine%20Blender%20Bottle%20Brand%20Manufactured%20by%20%3Ca%20href%3D%22https%3A%2F%2Fwww.iherb.com%2Fc%2FBlender-Bottle%22%3EBlender%20Bottle%2FSundesa%3C%2Fa%3E%20for%20iHerb.%3C%2Fli%3E%3Cli%3EBlender%20Ball%20Mixer%20Inside%3C%2Fli%3E%3Cli%3EEasy-Grip%20Design%3C%2Fli%3E%3Cli%3EOunce%20and%20Milliliter%20Marking%3C%2Fli%3E%3Cli%3EStay-Open%20Flip%20Top%3C%2Fli%3E%3Cli%3EEasy%20to%20Clean%3C%2Fli%3E%3Cli%3EDishwasher%20Safe%3C%2Fli%3E%3Cli%3ELarge%20Drink%2FPour%20Spout%3C%2Fli%3E%3Cli%3ESecure%20Screw-On%20Lid%3C%2Fli%3E%3Cli%3EWide%20Opening%20for%20Ingredients%3C%2Fli%3E%3Cli%3EFits%20in%20Most%20Car%20Drink%20Holders%3C%2Fli%3E%3Cli%3ENo%20Electricity%20or%20Batteries%20Required%3C%2Fli%3E%3Cli%3EPatented%3C%2Fli%3E%3Cli%3EBPA%20Free!%3C%2Fli%3E%3C%2Ful%3E%3Cp%3EGourmet%20cooks%20have%20relied%20on%20the%20wire%20whisk%20for%20hundreds%20of%20years%20to%20blend%20their%20ingredients%20into%20a%20smooth%20and%20light%20consistency.%20Now%20you%20can%20do%20the%20same%20with%20the%20Blender%20Bottle!%20It's%20prefect%20for%20mixing%20everything%20from%20creamy%20smooth%20nutrition%20shakes%20to%20salad%20dressings%2C%20marinades%2C%20and%20fluffy%20omelets.%20It%20also%20makes%20a%20great%20water%20bottle.%3C%2Fp%3E%3Cp%3ESimply%20drop%20the%20BlenderBall%20wire%20whisk%20into%20the%20BlenderBottle%20along%20with%20your%20ingredients%2C%20screw%20on%20the%20lid%2C%20press%20down%20the%20flip%20top%2C%20and%20shake.%20The%20patented%20BlenderBall%20moves%20freely%20throughout%20the%20bottle%20as%20you%20shake%2C%20mixing%20the%20thickest%20ingredients%20with%20ease-it's%20made%20electropolished%20surgical-grade%20stainless%20steel%20and%20is%20designed%20to%20remain%20in%20the%20cup%20until%20you've%20enjoyed%20the%20contents.%3C%2Fp%3E%3Cp%3EThis%20Blender%20bottle%20fits%2028%20oz%20when%20filled%20to%20the%20top%20with%20the%20lid%20on.%3C%2Fp%3E",
            "slug": "California Gold Nutrition",
            "quantity": "50",
            "sku": "PSKU001",
            "category_id": 18,
            "is_combination": 0,
            "variants": null,
            "tags": null,
            "created_at": "2023-12-13T07:21:41.000000Z",
            "updated_at": "2024-02-22T05:18:17.000000Z",
            "status": "show",
            "brand": "ALLMAX",
            "brand_id": 32,
            "is_tax_apply": 1,
            "sell_price": "25",
            "images": [
                {
                    "id": 23,
                    "product_id": 58,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-bfad349e11218490d86c4eeb3016e64d.avif",
                    "original_name": "189.avif"
                },
                {
                    "id": 24,
                    "product_id": 58,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-9119c2bb236159e0a02b5f2f84ceeabd.avif",
                    "original_name": "194.avif"
                },
                {
                    "id": 25,
                    "product_id": 58,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-f1f6a1f733b41abd057234ef2871ca6e.avif",
                    "original_name": "220.avif"
                },
                {
                    "id": 26,
                    "product_id": 58,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-8233342f6040495741003ddfefff1899.avif",
                    "original_name": "223.avif"
                },
                {
                    "id": 27,
                    "product_id": 58,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-28f5e78660fb6a868a23604f0c35ae86.avif",
                    "original_name": "224.avif"
                }
            ]
        },
        {
            "id": 59,
            "name": "Vaseline, Lip Therapy, Rosy Lip Balm, 0.25 oz (7 g)",
            "price": "18.00",
            "bar_code": "VSL-23159",
            "description": "%3Ch3%3E%3Cstrong%3EDescription%3C%2Fstrong%3E%3C%2Fh3%3E%3Cul%3E%3Cli%3EEst.%201926%3C%2Fli%3E%3Cli%3ENatural%20%26amp%3B%20Artificial%20Flavors%3C%2Fli%3E%3Cli%3EReplace%20a%20Meal%20%26amp%3B%20Lose%20Weight%26nbsp%3B%3C%2Fli%3E%3Cli%3EMeasurable%20Results!%26nbsp%3B%3C%2Fli%3E%3Cli%3EDelicious%20Meal%20Replacement%3C%2Fli%3E%3Cli%3EOnly%20140%20Calories%20Per%20Serving%26nbsp%3B%3C%2Fli%3E%3Cli%3EEat%20Healthy%2C%20Feel%20Healthy%3C%2Fli%3E%3Cli%3E13g%20Protein%3C%2Fli%3E%3Cli%3E24%20Vitamins%20%26amp%3B%20Minerals%26nbsp%3B%3C%2Fli%3E%3Cli%3E0%20g%20Trans%20Fat%26nbsp%3B%3C%2Fli%3E%3Cli%3ELactose-Free%26nbsp%3B%3C%2Fli%3E%3Cli%3EGluten-Free%3C%2Fli%3E%3Cli%3ENon-GMO%20Soy%3C%2Fli%3E%3Cli%3EQuality%20Assured%20Purity%3C%2Fli%3E%3Cli%3ENaturade%20Quality%20and%20Purity%20Assured%20since%201926%3C%2Fli%3E%3C%2Ful%3E%3Cp%3E%3Cstrong%3EReplace%20a%20Meal%20and%20Lose%20Weight!%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3ETotal%20Soy%20can%20help%20you%20lose%20weight.%3C%2Fp%3E%3Cp%3EHave%20a%20delicious%20Naturade%20Total%20Soy%20shake%20in%20place%20of%20one%20meal%20daily.%20This%20tasty%20shake%20provides%20all%20the%20nutrition%20of%20a%20complete%20meal%2C%20low%20in%20cholesterol%2C%20with%20only%20140%20calories%20per%20serving%20so%20you%20can%20replace%20one%20meal%20a%20day%20and%20cut%20calories.%20Reducing%20weight%20can%20be%20beneficial%20to%20your%20health.%20Just%20follow%20our%203%20Easy%20Steps%20plan.%3C%2Fp%3E%3Cp%3E%3Cstrong%3ETotal%20Soy%20is%20great%20as%20a%20quick%20breakfast%20or%20as%20a%20meal%20on-the-go.%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3EWhen%20you're%20on%20a%20busy%20schedule%2C%20healthy%20eating%20can%20be%20a%20challenge.%20With%20Total%20Soy%20you%20just%20add%20water%20to%20make%20a%20satisfying%2C%20delicious%20weight%20loss%20shake%20in%20seconds.%3C%2Fp%3E%3Cp%3E%3Cstrong%3E3%20Easy%20Steps%20to%20Lose%20Weight%3C%2Fstrong%3E%26nbsp%3B%3C%2Fp%3E%3Col%3E%3Cli%3EReplace%20a%20meal.%20Have%20a%20delicious%20Naturade%20Total%20Soy%20shake%20in%20place%20of%20one%20meal%20daily.%26nbsp%3B%3C%2Fli%3E%3Cli%3EEat%20right.%20Increase%20intake%20of%20healthy%20whole%20foods%20options%20and%20fiber%20but%20reduce%20intake%20of%20sodium%2C%20cholesterol%2C%20and%20saturated%20fat.%20Drink%20plenty%20of%20water.%26nbsp%3B%3C%2Fli%3E%3Cli%3EExercise%20weekly.%20Just%2030-60%20minutes%20of%20light%20exercise%204%20days%20a%20week%20helps%20to%20enhance%20weight%20loss.%26nbsp%3B%3C%2Fli%3E%3C%2Fol%3E%3Cp%3ENaturade%20Total%20Soy%20is%20made%20with%20premium%20Soy%20Protein%20for%20proven%20health%20benefits%20and%20great%20taste.%20So%20you%20can%20be%20sure%20that%20you're%20getting%20all%20the%20essential%20amino%20acids%20plus%20naturally%20occurring%20isoflavones.%3C%2Fp%3E%3Ch3%3E%3Cstrong%3ESuggested%20use%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EAdd%202%20scoops%20(36%20grams)%20of%20Naturade%20Total%20Soy%20to%208%20oz%20of%20cold%20water%20or%20your%20favorite%20beverage%20and%20shake%20or%20stir%20with%20a%20spoon%20until%20smooth.%20Recommended%20daily%20dose%3A%20one%20serving%20per%20day.%3C%2Fp%3E",
            "slug": "Vaseline, Lip Therapy, Rosy Lip Balm",
            "quantity": "80",
            "sku": "PSKU002",
            "category_id": 2,
            "is_combination": 0,
            "variants": null,
            "tags": null,
            "created_at": "2023-12-13T10:38:28.000000Z",
            "updated_at": "2024-02-22T05:18:57.000000Z",
            "status": "show",
            "brand": "Vaseline",
            "brand_id": 33,
            "is_tax_apply": 0,
            "sell_price": "18",
            "images": [
                {
                    "id": 28,
                    "product_id": 59,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-48e9416b90b7eded99245c146f8c8553.avif",
                    "original_name": "5.avif"
                },
                {
                    "id": 29,
                    "product_id": 59,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-619ce9d848589c5bceae3266886c4a56.avif",
                    "original_name": "6.avif"
                },
                {
                    "id": 30,
                    "product_id": 59,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-0010f0f8576cc4ee3122fb09de177ef5.avif",
                    "original_name": "7.avif"
                }
            ]
        },
        {
            "id": 60,
            "name": "Eucerin, Advanced Repair Hand Creme, Fragrance Free, 2.7 oz (78 g)",
            "price": "20.00",
            "bar_code": "VSL-23159",
            "description": "%3Ch3%3E%3Cstrong%3EOther%20ingredients%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3ESoy%20protein%20isolate%2C%20cane%20sugar%2C%20maltodextrin%2C%20cocoa%20processed%20with%20alkali%2C%20sunflower%20oil%2C%20natural%20%26amp%3B%20artificial%20flavors%2C%20contains%202%25%20or%20less%20of%20chicory%20inulin%2C%20tricalcium%20phosphate%2C%20sea%20salt%2C%20xanthan%20gum%2C%20magnesium%20oxide%2C%20sodium%20caseinate%2C%20guar%20gum%2C%20potassium%20citrate%2C%20medium%20chain%20triglycerides%2C%20dicalcium%20phosphate%2C%20ascorbic%20acid%2C%20ferrous%20fumarate%2C%20sucralose%2C%20acesulfame%20potassium%2C%20modified%20food%20starch%2C%20d-alpha%20tocopheryl%20acetate%2C%20niacinamide%2C%20zinc%20oxide%2C%20d-calcium%20pantothenate%2C%20manganese%20citrate%2C%20copper%20citrate%2C%20beta%20carotene%2C%20vitamin%20A%20palmitate%2C%20pyridoxine%20hydrochloride%2C%20riboflavin%2C%20thiamine%20hydrochloride%2C%20chromium%20nicotinate%2C%20folic%20acid%2C%20biotin%2C%20potassium%20iodine%2C%20sodium%20selenate%2C%20cholecalciferol%2C%20cyanocobalamin.%3C%2Fp%3E%3Cp%3EAllergen%20statement%3A%20contains%20milk%2C%20soy.%3C%2Fp%3E%3Cp%3ENo%20aspartame%2C%20no%20msg%2C%20no%20lactose%2C%20yeast%20free%2C%20gluten%20free%2C%20no%20egg.%20manufactured%20in%20a%20facility%20that%20processes%20milk%2C%20soy%2C%20eggs%2C%20wheat.%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EWarnings%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EConsult%20your%20physician%20before%20using%20this%20product%2C%20especially%20if%20you%20are%20pregnant%2C%20nursing%2C%20anticipate%20surgery%2C%20taking%20any%20medications%20regularly%2C%20or%20are%20under%20medical%20supervision.%26nbsp%3B%3C%2Fp%3E%3Cp%3EProp%2065%20warning%20(California%20residents%20only)%3A%20This%20product%20contains%20a%20chemical%20known%20to%20the%20State%20of%20California%20to%20cause%20birth%20defects%20or%20other%20reproductive%20harm.%20Keep%20out%20of%20reach%20of%20children.%3C%2Fp%3E%3Cp%3EEach%20container%20has%20an%20inner%20seal%20under%20the%20plastic%20cap%20that%20keeps%20the%20product%20fresh%20and%20safe.%20Do%20not%20use%20if%20seal%20is%20broken%20or%20missing.%20This%20product%20is%20sold%20by%20weight%20not%20by%20volume.%20Contents%20may%20settle%20during%20shipping%20and%20handling.%20Store%20in%20a%20cool%2C%20dry%20place.%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EDisclaimer%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EWhile%20iHerb%20strives%20to%20ensure%20the%20accuracy%20of%20its%20product%20images%20and%20information%2C%20some%20manufacturing%20changes%20to%20packaging%20and%2For%20ingredients%20may%20be%20pending%20update%20on%20our%20site.%20Although%20items%20may%20occasionally%20ship%20with%20alternate%20packaging%2C%20freshness%20is%20always%20guaranteed.%20We%20recommend%20that%20you%20read%20labels%2C%20warnings%20and%20directions%20of%20all%20products%20before%20use%20and%20not%20rely%20solely%20on%20the%20information%20provided%20by%20iHerb.%3C%2Fp%3E",
            "slug": "Eucerin, Advanced Repair Hand Creme, Fragrance Free",
            "quantity": "60",
            "sku": "PSKU002",
            "category_id": 3,
            "is_combination": 0,
            "variants": null,
            "tags": null,
            "created_at": "2023-12-13T12:26:32.000000Z",
            "updated_at": "2024-02-22T05:19:35.000000Z",
            "status": "show",
            "brand": "Default Brand",
            "brand_id": 11,
            "is_tax_apply": 0,
            "sell_price": "20",
            "images": [
                {
                    "id": 31,
                    "product_id": 60,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-587c7f2ea666438dfd39125807864c25.avif",
                    "original_name": "12.avif"
                },
                {
                    "id": 32,
                    "product_id": 60,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-45d84424d22337366a8d22a15a282f18.avif",
                    "original_name": "13.avif"
                }
            ]
        },
        {
            "id": 61,
            "name": "Eucerin, Roughness Relief Lotion, Fragrance Free, 16.9 fl oz (500 ml)",
            "price": "17.00",
            "bar_code": "VSL-23159",
            "description": "%3Ch3%3E%3Cstrong%3EDescription%3C%2Fstrong%3E%3C%2Fh3%3E%3Cul%3E%3Cli%3E%3Ci%3ECalifornia%20Gold%20Nutrition%3C%2Fi%3E%20%3Cstrong%3ESnack%20Bar%20Variety%20Pack%3C%2Fstrong%3E%3C%2Fli%3E%3Cli%3EIncludes%206%20Flavors%3A%20%3Ca%20href%3D%22https%3A%2F%2Fwww.iherb.com%2Fpr%2Fcalifornia-gold-nutrition-foods-wild-blueberry-almond-chewy-granola-bars-12-bars-1-4-oz-40-g-each%2F88967%22%3EWild%20Blueberry%20%26amp%3B%20Almond%3C%2Fa%3E%2C%20%3Ca%20href%3D%22https%3A%2F%2Fwww.iherb.com%2Fpr%2Fcalifornia-gold-nutrition-foods-cranberry-almond-chewy-granola-bars-12-bars-1-4-oz-40-g-each%2F89093%22%3ECranberry%20%26amp%3B%20Almond%3C%2Fa%3E%2C%20%3Ca%20href%3D%22https%3A%2F%2Fwww.iherb.com%2Fpr%2Fcalifornia-gold-nutrition-foods-coconut-almond-chewy-granola-bars-12-bars-1-4-oz-40-g-each%2F88968%22%3ECoconut%20Almond%3C%2Fa%3E%2C%20%3Ca%20href%3D%22https%3A%2F%2Fwww.iherb.com%2Fpr%2Fcalifornia-gold-nutrition-foods-mocha-nut-chewy-granola-bars-12-bars-1-4-oz-40-g-each%2F88969%22%3EMocha%20Nut%3C%2Fa%3E%2C%20%3Ca%20href%3D%22https%3A%2F%2Fwww.iherb.com%2Fpr%2Fcalifornia-gold-nutrition-foods-peanut-dark-chocolate-chunk-bars-12-bars-1-4-oz-40-g-each%2F74184%22%3EPeanut%20%26amp%3B%20Dark%20Chocolate%20Chunk%3C%2Fa%3E%2C%20%3Ca%20href%3D%22https%3A%2F%2Fwww.iherb.com%2Fpr%2Fcalifornia-gold-nutrition-foods-dark-chocolate-nuts-sea-salt-bar-gold-bar-12-bars%2F74183%22%3EDark%20Chocolate%2C%20Nuts%2C%20%26amp%3B%20Sea%20Salt%3C%2Fa%3E%3C%2Fli%3E%3Cli%3EMade%20with%20Simple%20Ingredients%3A%20Roasted%20Almonds%2C%20Ancient%20Grains%2C%20Peanuts%2C%20Walnuts%2C%20Goji%20Berries%2C%20and%20Honey%3C%2Fli%3E%3Cli%3EA%20Good%20Source%20of%20Plant%20Based%20Protein%20and%20Dietary%20Fiber%3C%2Fli%3E%3Cli%3ESuitable%20for%20Vegetarians%3C%2Fli%3E%3Cli%3ENo%20Artificial%20Colors%2C%20Flavors%2C%20Sweeteners%2C%20or%20Preservatives%3C%2Fli%3E%3Cli%3EFormulated%20without%20GMOs%26nbsp%3B%3C%2Fli%3E%3Cli%3EProduced%20in%20a%203rd%20Party%20Audited%20cGMP%20Registered%20(Certified)%20Facility%3C%2Fli%3E%3Cli%3E100%25%20Gold%20Guarantee%3C%2Fli%3E%3C%2Ful%3E%3Cp%3EFinding%20satisfying%20healthy%20snacks%20is%20no%20easy%20task.%20The%20snacks%20that%20taste%20good%20are%20often%20packed%20with%20artificial%20ingredients%20and%20sugar%2C%20leaving%20you%20feeling%20defeated.%20Our%20snack%20bars%20offer%20the%20perfect%20balance%20between%20healthy%20and%20tasty%2C%20making%20them%20the%20gold%20standard%20for%20snacking.%20The%20next%20time%20you%E2%80%99re%20craving%20a%20bite%2C%20be%20sure%20to%20reach%20for%20one%20of%20these%20delicious%20bars.%3C%2Fp%3E%3Cp%3E%3Ci%3ECalifornia%20Gold%20Nutrition%3C%2Fi%3E%3Cstrong%3E%26nbsp%3BSnack%20Bar%20Variety%20Pack%3C%2Fstrong%3E%20contains%20a%20sample%20of%20our%20snack%20bar%20varieties.%20All%206%20varieties%20are%20made%20with%20simple%20ingredients%2C%20like%20roasted%20almonds%2C%20ancient%20grains%2C%20goji%20berries%2C%20and%20peanuts%20to%20create%20a%20nutritious%20and%20satisfying%20treat%20with%20plenty%20of%20fiber%20and%20protein.%20Each%20bar%20is%20individually%20wrapped%2C%20making%20them%20perfect%20for%20on-the-go%20snacking%20anytime%2C%20anywhere.%3C%2Fp%3E",
            "slug": "Eucerin, Advanced Repair Hand Creme, Fragrance Free",
            "quantity": "67",
            "sku": "PSKU002",
            "category_id": 2,
            "is_combination": 0,
            "variants": null,
            "tags": null,
            "created_at": "2023-12-13T12:29:02.000000Z",
            "updated_at": "2024-02-22T05:28:19.000000Z",
            "status": "show",
            "brand": "new brands",
            "brand_id": 25,
            "is_tax_apply": 0,
            "sell_price": "17",
            "images": [
                {
                    "id": 33,
                    "product_id": 61,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-f6728af1702b78102e84afd894ccf1c8.avif",
                    "original_name": "16.avif"
                },
                {
                    "id": 34,
                    "product_id": 61,
                    "name": "https://backend.kingsmankids.com/uploads/products/2023/12/laravel-c18390448c94e094c2d49b917ec0ffe1.avif",
                    "original_name": "17.avif"
                }
            ]
        }, {
            "id": 206,
            "name": "CosRx, Advanced Snail 92, All in One Cream, 3.52 oz (100 g)",
            "price": "65.00",
            "bar_code": "8809416470016",
            "description": "%3Ch3%3E%3Cstrong%3EDescription%3C%2Fstrong%3E%3C%2Fh3%3E%3Cul%3E%3Cli%3EExpecting%20Tomorrow%3C%2Fli%3E%3C%2Ful%3E%3Cp%3EFormulated%20with%2092%25%20Snail%20Secretion%20Filtrate(Mucin)%2C%20this%20cream%20helps%20naturally%20create%20the%20appealing%20glow%20of%20healthy%20skin.%3C%2Fp%3E%3Cp%3EThis%20Advanced%20Snail%20All%20in%20one%20Cream%20that%20supports%20natural%20regeneration%20of%20damaged%20skin%20to%20reduce%20the%20appearance%20of%20wrinkles.%3C%2Fp%3E%3Cp%3E%22Snail%20cream%20with%20layering%20of%20hyper-moisturization%20without%20thirst%20or%20broken%20barriers!%22%3C%2Fp%3E%3Cp%3EAdvanced%20Snail%2092%20All%20in%20One%20Cream%20is%20a%20nourishing%20moisture%20cream%20that%20endows%20energy%20and%20beauty%20to%20the%20skin%20with%20purely%20separated%20snail%20secretion%20filtrate%20at%2092%25%20content%2C%20from%20living%20Korean%20snails.%3C%2Fp%3E%3Cp%3EAdvanced%20Snail%2092%20All%20in%20One%20Cream%20is%20safe%20for%20usage%20in%20skin%2C%20consisting%20of%20excellent%20skin-activation%20components%2C%20preventing%20skin%20damage%20and%20available%20for%20use%20immediately%20after%20facial%20wash%2C%20without%20skin%20or%20lotion.%3C%2Fp%3E%3Ch3%3E%3Cstrong%3ESuggested%20use%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EApply%20to%20face%20at%20least%20twice%20daily%20or%20as%20needed%20to%20soothe%20dry%2C%20uncomfortable%20skin.%3Cbr%3E%26nbsp%3B%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EOther%20ingredients%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3ESnail%20secretion%20filtrate%2C%20betaine%2C%20caprylic%2Fcapric%20triglyceride%2C%20cetearyl%20olivate%2C%20sorbitan%20olivate%2C%20cetearyl%20alcohol%2C%20carbomer%2C%20arginine%2C%20dimethicone%2C%20sodium%20polyacrylate%2C%20phenoxyethanol%2C%20sodium%20hyaluronate%2C%20stearic%20acid%2C%20allantoin%2C%20panthenol%2C%20xanthan%20gum%2C%20ethyl%20hexanediol%2C%20adenosine.%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EWarnings%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3ECaution%20%3A%201.%20For%20external%20use%20only.%202.%20Do%20not%20use%20on%20damaged%20or%20broken%20skin.%203.%20Stop%20using%20and%20ask%20a%20doctor%20if%20rash%20occurs.%204.%20When%20using%20this%20product%2C%20keep%20out%20of%20eyes.%205.%20Keep%20out%20of%20reach%20of%20children.%206.%20If%20product%20is%20swallowed%2C%20get%20medical%20help%20or%20contact%20a%20Poison%20Control%20Center%20right%20away.%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EDisclaimer%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EWhile%20iHerb%20strives%20to%20ensure%20the%20accuracy%20of%20its%20product%20images%20and%20information%2C%20some%20manufacturing%20changes%20to%20packaging%20and%2For%20ingredients%20may%20be%20pending%20update%20on%20our%20site.%20Although%20items%20may%20occasionally%20ship%20with%20alternate%20packaging%2C%20freshness%20is%20always%20guaranteed.%20We%20recommend%20that%20you%20read%20labels%2C%20warnings%20and%20directions%20of%20all%20products%20before%20use%20and%20not%20rely%20solely%20on%20the%20information%20provided%20by%20iHerb.%3C%2Fp%3E",
            "slug": "cosrx-advanced-snail-92-all-in-one-cream-3-52-oz-100-g-",
            "quantity": "10",
            "sku": "CRX-47001",
            "category_id": 80,
            "is_combination": 0,
            "variants": null,
            "tags": "Beauty, K-Beauty,K-Beauty Moisturizers, Creams",
            "created_at": "2024-02-23T12:37:04.000000Z",
            "updated_at": "2024-02-23T12:37:04.000000Z",
            "status": "show",
            "brand": "CosRx",
            "brand_id": 43,
            "is_tax_apply": 1,
            "sell_price": "50",
            "images": [
                {
                    "id": 214,
                    "product_id": 206,
                    "name": "https://backend.kingsmankids.com/uploads/products/2024/02/laravel-1472dc833aadb4fc46fb3e185880a632.avif",
                    "original_name": "24.avif"
                },
                {
                    "id": 215,
                    "product_id": 206,
                    "name": "https://backend.kingsmankids.com/uploads/products/2024/02/laravel-4c4f845b0b124bb520893d55edebc3ec.avif",
                    "original_name": "25.avif"
                },
                {
                    "id": 216,
                    "product_id": 206,
                    "name": "https://backend.kingsmankids.com/uploads/products/2024/02/laravel-91004f5cbdfc6b59882a85a53c92078a.avif",
                    "original_name": "26.avif"
                },
                {
                    "id": 217,
                    "product_id": 206,
                    "name": "https://backend.kingsmankids.com/uploads/products/2024/02/laravel-0f2f9191263470d6ee733b17064dd269.avif",
                    "original_name": "29.avif"
                }
            ]
        },

        {
            "id": 189,
            "name": "v2",
            "price": "20.00",
            "bar_code": "detest",
            "description": "%3Ch3%3E%3Cstrong%3EOther%20ingredients%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3E%3Cstrong%3ECoconut%20Almond%20Chewy%20Granola%20Bar%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3EPeanuts%2C%20Chicory%20Root%20Fiber%2C%20Walnuts%2C%20Dry%20Roasted%20Almonds%2C%20Raisins%20(Raisins%2C%20Sunflower%20Seed%20Oil)%2C%20Organic%20Ancient%20Grain%20Granola%20(Organic%20Gluten%20Free%20Whole%20Rolled%20Oats%2C%20Organic%20Evaporated%20Cane%20Syrup%2C%20Organic%20Rice%20Syrup%2C%20Organic%20Flax%20Seeds%2C%20Organic%20Coconut%2C%20Organic%20Puffed%20Quinoa%2C%20Organic%20Amaranth%20Flour%2C%20Organic%20Chia%20Seeds%2C%20Organic%20Vanilla%20Extract%2C%20Salt)%2C%20Blueberries%20(Wild%20Blueberries%2C%20Apple%20Juice%20Concentrate%2C%20Sunflower%20Oil)%2C%20Honey%2C%20Goji%20Berries%2C%20Glycerin%2C%20High%20Oleic%20Sunflower%20Oil%2C%20Pea%20Crisps%20(Pea%20Protein%2C%20Rice%20Starch)%2C%20Organic%20Flavor%2C%20Sea%20Salt%2C%20Flax%20Seeds%2C%20Sunflower%20Tocopherol%2C%20Green%20Tea%20Extract%20(Green%20Tea%20Extract%2C%20Maltodextrin).%3C%2Fp%3E",
            "slug": "v2",
            "quantity": "20",
            "sku": "ghggh",
            "category_id": 23,
            "is_combination": 0,
            "variants": null,
            "tags": "test",
            "created_at": "2024-02-20T04:11:15.000000Z",
            "updated_at": "2024-02-22T05:29:09.000000Z",
            "status": "show",
            "brand": "Default Brand",
            "brand_id": 11,
            "is_tax_apply": 1,
            "sell_price": "20",
            "images": [
                {
                    "id": 185,
                    "product_id": 189,
                    "name": "https://backend.kingsmankids.com/uploads/products/2024/02/laravel-8a91f60a6143d0f9d453be35aad2695c.jpg",
                    "original_name": "73-737925_beautiful-red-leaves-photo-nature-wallpaper-hd-free.jpg"
                },
                {
                    "id": 186,
                    "product_id": 189,
                    "name": "https://backend.kingsmankids.com/uploads/products/2024/02/laravel-34585ea2e64844d64869176c03172cfa.jpg",
                    "original_name": "5186.jpg"
                }
            ]
        },
        {
            "id": 199,
            "name": "ALLMAX, Caffeine",
            "price": "25.00",
            "bar_code": "665553126227",
            "description": "%3Ch3%3E%3Cstrong%3EDescription%3C%2Fstrong%3E%3C%2Fh3%3E%3Cul%3E%3Cli%3EScience%20-%20Innovation%20-%20Quality%20-%20Results%3C%2Fli%3E%3Cli%3ERestore%20Mental%20Alertness%3C%2Fli%3E%3Cli%3EEnergize%20Your%20Workouts%3C%2Fli%3E%3Cli%3EDietary%20Supplement%3C%2Fli%3E%3Cli%3EQuality%20Guarantee%20-%20Purity%20%26amp%3B%20Potency%20Tested%3C%2Fli%3E%3Cli%3EcGMP%20Registered%20Facility%3C%2Fli%3E%3Cli%3ELab%20Tested%20Every%20Lot%3C%2Fli%3E%3Cli%3EVegan%3C%2Fli%3E%3C%2Ful%3E%3Cp%3E%3Cstrong%3EIndications%3A%3C%2Fstrong%3E%20Helps%20temporarily%20restore%20mental%20alertness%20or%20wakefulness%20when%20experiencing%20fatigue%20or%20drowsiness.%3C%2Fp%3E%3Ch3%3E%3Cstrong%3ESuggested%20use%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3ETake%201%20tablet%20every%203%20to%204%20hours%20up%20to%20a%20maximum%20of%201%2C000%20mg%20(5%20tablets)%20in%2024%20hours.%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EOther%20ingredients%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EDicalcium%20phosphate%2C%20microcrystalline%20cellulose%2C%20vegetable%20magnesium%20stearate%2C%20croscarmellose%20sodium.%3C%2Fp%3E%3Cp%3E%3Cstrong%3EAllergen%20warning%3A%26nbsp%3B%3C%2Fstrong%3EProduced%20in%20a%20facility%20that%20also%20handles%20milk%2C%20soy%2C%20wheat%2C%20egg%2C%20peanuts%2C%20tree%20nuts%2C%20sesame%2C%20fish%2C%20crustacean%20and%20shellfish%20products.%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EWarnings%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EFor%20occasional%20use%20only.%20Caffeine%20is%20not%20advisable%20in%20cases%20of%20high%20blood%20pressure%20or%20pregnancy.%20Not%20intended%20as%20a%20substitute%20for%20sleep.%20The%20recommended%20dose%20of%20this%20product%20contains%20about%20as%20much%20caffeine%20as%20a%20large%20strong%20cup%20of%20coffee.%20Limit%20the%20amount%20of%20caffeine%20containing%20medications%2C%20beverages%20(coffee%2C%20tea%2C%20colas)%20or%20foods%20(chocolate)%20as%20too%20much%20caffeine%20may%20cause%20nervousness%2C%20irritability%2C%20sleeplessness%20and%20occasionally%2C%20rapid%20heart%20rate.%20Do%20not%20use%20if%20you%20are%20pregnant%20or%20nursing.%20Do%20not%20use%20if%20the%20safety%20seal%20is%20missing%20or%20broken.%20Store%20in%20a%20cool%2C%20dry%20place%20and%20keep%20out%20of%20direct%20sunlight.%20Keep%20out%20of%20reach%20of%20children.%20Not%20for%20use%20by%20individuals%20under%20the%20age%20of%2018%20years.%3C%2Fp%3E%3Cp%3ECalifornia%20warning.%20Lead%20is%20known%20to%20the%20State%20of%20California%20to%20cause%20birth%20defects%20or%20reproductive%20harm.%20Consuming%20this%20product%20can%20expose%20you%20to%20more%20than%200.0000005%20g%20of%20lead.%20Prop%2065.%3Cbr%3E%26nbsp%3B%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EDisclaimer%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EWhile%20iHerb%20strives%20to%20ensure%20the%20accuracy%20of%20its%20product%20images%20and%20information%2C%20some%20manufacturing%20changes%20to%20packaging%20and%2For%20ingredients%20may%20be%20pending%20update%20on%20our%20site.%20Although%20items%20may%20occasionally%20ship%20with%20alternate%20packaging%2C%20freshness%20is%20always%20guaranteed.%20We%20recommend%20that%20you%20read%20labels%2C%20warnings%20and%20directions%20of%20all%20products%20before%20use%20and%20not%20rely%20solely%20on%20the%20information%20provided%20by%20iHerb.%3C%2Fp%3E",
            "slug": "allmax-caffeine",
            "quantity": "99",
            "sku": "AMX-12622",
            "category_id": 78,
            "is_combination": 0,
            "variants": null,
            "tags": "Caffeine, Pre-Workout Supplements,Stimulant",
            "created_at": "2024-02-20T13:48:50.000000Z",
            "updated_at": "2024-02-22T05:30:02.000000Z",
            "status": "show",
            "brand": "ALLMAX",
            "brand_id": 32,
            "is_tax_apply": 1,
            "sell_price": "25",
            "images": [
                {
                    "id": 208,
                    "product_id": 199,
                    "name": "https://backend.kingsmankids.com/uploads/products/2024/02/laravel-2972aff3942d7c5cb3d91faf8154aa10.avif",
                    "original_name": "34.avif"
                }
            ]
        },
        {
            "id": 202,
            "name": "California Gold Nutrition",
            "price": "35.00",
            "bar_code": "898220010646",
            "description": "%3Ch3%3E%3Cstrong%3EDescription%3C%2Fstrong%3E%3C%2Fh3%3E%3Cul%3E%3Cli%3E%3Ci%3ECalifornia%20Gold%20Nutrition%3C%2Fi%3E%C2%AE%EF%B8%8F%3Cstrong%3E%26nbsp%3BOmega-3%20Premium%20Fish%20Oil%3C%2Fstrong%3E%3C%2Fli%3E%3Cli%3EFeaturing%20Globally-Sourced%2C%20Highly-Refined%20Fish%20Oil%3C%2Fli%3E%3Cli%3EConcentrated%20and%20Molecularly%20Distilled%3C%2Fli%3E%3Cli%3ESupports%20Overall%20Immune%20Health*%26nbsp%3B%3C%2Fli%3E%3Cli%3EHelps%20to%20Maintain%20Optimal%20Lipid%20Profile*%3C%2Fli%3E%3Cli%3EFormulated%20without%20Gluten%2C%20GMOs%2C%20or%20Soy%3C%2Fli%3E%3Cli%3EProduced%20in%20a%203rd%20Party%20Audited%20cGMP%20Registered%20(Certified)%20Facility%3C%2Fli%3E%3Cli%3E100%25%20Gold%20Guarantee%3C%2Fli%3E%3C%2Ful%3E%3Cp%3E%26nbsp%3B%3C%2Fp%3E%3Cp%3EOmega-3%20fatty%20acids%20are%20one%20type%20of%20%E2%80%9Cgood%20fat%E2%80%9D%20found%20in%20many%20fish%20sources%20that%20your%20body%20can%20use%20to%20support%20various%20functions.%20%3Ci%3ECalifornia%20Gold%20Nutrition%3C%2Fi%3E%20%3Cstrong%3EOmega-3%20Premium%20Fish%20Oil%3C%2Fstrong%3E%20contains%20multiple%20omega-3s%2C%20including%20DHA%20and%20EPA%2C%20which%20can%20help%20you%20get%20plenty%20of%20these%20nutrients%20daily%2C%20promoting%20the%20health%20of%20many%20systems%20in%20the%20body.*%3C%2Fp%3E%3Cp%3E%3Ci%3EBenefits%20of%20Omega-3%20Supplements%3C%2Fi%3E%3Cbr%3EWhen%20you%20aren%E2%80%99t%20able%20to%20add%20enough%20omega-3s%20to%20your%20diet%20via%20food%2C%20a%20daily%20supplement%20can%20help%20you%20maintain%20sufficient%20levels%20of%20good%20fat.%20Doing%20so%20has%20been%20associated%20with%20maintaining%20an%20optimal%20lipid%20profile.*%20In%20addition%2C%20adequate%20omega-3%20intake%20is%20thought%20to%20provide%20other%20health%20benefits%2C%20such%20as%20a%20reduced%20risk%20of%20cardiovascular%20disease%2C%20healthy%20brain%20function%2C%20and%20support%20of%20overall%20immune%20health.*%3C%2Fp%3E%3Cp%3E%3Ci%3ECalifornia%20Gold%20Nutrition%3C%2Fi%3E%3Cstrong%3E%26nbsp%3BOmega-3%20Premium%20Fish%20Oil%26nbsp%3B%3C%2Fstrong%3Eis%20molecularly%20distilled%20and%20features%20180%20mg%20EPA%20and%20120%20mg%20DHA%20per%20capsule%20of%20globally-sourced%2C%20highly-refined%2C%20and%20concentrated%20natural%20fish%20oil%20that%20meets%20strict%20quality%20control%20standards.%20The%20fish%20gelatin%20softgels%20are%20porcine%20and%20bovine%20free%20and%20manufactured%20in%20California%2C%20USA%20with%20internationally%20sourced%20ingredients.%3C%2Fp%3E",
            "slug": "california-gold-nutrition",
            "quantity": "20",
            "sku": "NDG-36220",
            "category_id": 72,
            "is_combination": 0,
            "variants": null,
            "tags": "test",
            "created_at": "2024-02-22T05:10:59.000000Z",
            "updated_at": "2024-02-22T05:30:50.000000Z",
            "status": "show",
            "brand": "California Gold Nutrition",
            "brand_id": 40,
            "is_tax_apply": 1,
            "sell_price": "35",
            "images": [
                {
                    "id": 211,
                    "product_id": 202,
                    "name": "https://backend.kingsmankids.com/uploads/products/2024/02/laravel-db20e3ff4fc2f68f3e46c52c798ef8ce.avif",
                    "original_name": "32.avif"
                }
            ]
        },
        {
            "id": 203,
            "name": "Very Vanilla Flavor",
            "price": "40.00",
            "bar_code": "898220012046",
            "description": "%3Ch3%3E%3Cstrong%3EDescription%3C%2Fstrong%3E%3C%2Fh3%3E%3Cul%3E%3Cli%3E%3Ci%3ECalifornia%20Gold%20Nutrition%20SPORT%26nbsp%3B%3C%2Fi%3E%3Cstrong%3EVery%20Vanilla%20Whey%20Protein%20Isolate%2C%202%20lbs%3C%2Fstrong%3E%3C%2Fli%3E%3Cli%3E27%20g%20Protein%2C%206.2%20g%20BCAAs%E2%98%89%2C%204.7%20g%20Glutamic%20Acid%E2%98%89%3C%2Fli%3E%3Cli%3EVery%20Vanilla%20Flavor%3C%2Fli%3E%3Cli%3ELow%20Lactose%E2%99%A2%3C%2Fli%3E%3Cli%3ENo%20rbST%E2%96%A3%3C%2Fli%3E%3Cli%3ESupports%20Muscle%20Growth*%3C%2Fli%3E%3Cli%3ENo%20Fillers%2C%20No%20Gluten%2C%20No%20GMOs%2C%20No%20Soy%3C%2Fli%3E%3Cli%3ENo%20Artificial%20Colors%2C%20Flavors%2C%20or%20Sweeteners%3C%2Fli%3E%3Cli%3EProduced%20in%20a%203rd%20Party%20Audited%20cGMP%20Registered%20(Certified)%20Facility%3C%2Fli%3E%3Cli%3E100%25%20Gold%20Guarantee%3C%2Fli%3E%3C%2Ful%3E%3Cp%3E%26nbsp%3B%3C%2Fp%3E%3Cp%3EFuel%20your%20fitness%20gains%20with%20the%20help%20of%20%3Ci%3ECalifornia%20Gold%20Nutrition%20SPORT%26nbsp%3B%3C%2Fi%3E%3Cstrong%3EVery%20Vanilla%20Whey%20Protein%26nbsp%3BIsolate%3C%2Fstrong%3E.%20When%20combined%20with%20a%20healthy%20diet%20and%20workout%20routine%2C%20this%20protein%20powder%20can%20help%20you%20achieve%20your%20goals%20by%20supporting%20muscle%20growth.*%20Shake%2C%20stir%2C%20or%20blend%20this%20delicious%20vanilla%20powder%20with%20your%20favorite%20beverage%20to%20create%20a%20convenient%20and%20tasty%20drink%20that%20makes%20it%20easy%20to%20get%20protein%20on%20the%20go.%3C%2Fp%3E%3Cp%3E%3Ci%3EWhey%20Protein%20Benefits%3C%2Fi%3E%3Cbr%3EWhey%20protein%20isolate%20is%20a%20protein%20concentrate%20of%20whey%20that%20is%20fast%20absorbing%20and%20easy%20to%20digest%2C%20efficiently%20delivering%20protein%20to%20the%20body.%20This%20type%20of%20protein%20is%20a%20good%20source%20of%20naturally%20occurring%20BCAAs%20(Branched%20Chain%20Amino%20Acids)%20and%20glutamic%20acid%2C%20which%20are%20recognized%20by%20bodybuilders%20for%20their%20support%20of%20muscle%20development.*%3C%2Fp%3E%3Cp%3E%3Ci%3ECalifornia%20Gold%20Nutrition%20SPORT%3C%2Fi%3E%20%3Cstrong%3EVery%20Vanilla%20Whey%20Protein%20Isolate%26nbsp%3B%3C%2Fstrong%3Efeatures%20more%20than%2025%20grams%20of%20protein%20and%206%20grams%20of%20BCAAs%20per%20serving.%20It%20contains%20low%20lactose%20and%20is%20manufactured%20by%20a%20multi-stage%20cold%20micro-filtration%20isolation%20process%20using%20state-of-the-art%20membrane%20technology.%3C%2Fp%3E%3Cp%3E%E2%98%89%3Cstrong%3ETypical%20Amino%20Acids%20(g)%20per%201%20Scoop%3C%2Fstrong%3E%3C%2Fp%3E%3Cfigure%20class%3D%22table%22%3E%3Ctable%3E%3Ctbody%3E%3Ctr%3E%3Ctd%3EAlanine%3C%2Ftd%3E%3Ctd%3E1.37%3C%2Ftd%3E%3Ctd%3EHistidine%3C%2Ftd%3E%3Ctd%3E0.43%3C%2Ftd%3E%3Ctd%3EProline%3C%2Ftd%3E%3Ctd%3E1.53%3C%2Ftd%3E%3C%2Ftr%3E%3Ctr%3E%3Ctd%3EArginine%3C%2Ftd%3E%3Ctd%3E0.49%3C%2Ftd%3E%3Ctd%3EIsoleucine%5E%3C%2Ftd%3E%3Ctd%3E1.79%3C%2Ftd%3E%3Ctd%3ESerine%3C%2Ftd%3E%3Ctd%3E1.16%3C%2Ftd%3E%3C%2Ftr%3E%3Ctr%3E%3Ctd%3EAspartic%20Acid%3C%2Ftd%3E%3Ctd%3E3.04%3C%2Ftd%3E%3Ctd%3ELeucine%5E%3C%2Ftd%3E%3Ctd%3E2.86%3C%2Ftd%3E%3Ctd%3EThreonine%3C%2Ftd%3E%3Ctd%3E1.88%3C%2Ftd%3E%3C%2Ftr%3E%3Ctr%3E%3Ctd%3ECysteine%3C%2Ftd%3E%3Ctd%3E0.62%3C%2Ftd%3E%3Ctd%3ELysine%3C%2Ftd%3E%3Ctd%3E2.63%3C%2Ftd%3E%3Ctd%3ETryptophan%3C%2Ftd%3E%3Ctd%3E0.51%3C%2Ftd%3E%3C%2Ftr%3E%3Ctr%3E%3Ctd%3EGlutamic%20Acid%3C%2Ftd%3E%3Ctd%3E4.66%3C%2Ftd%3E%3Ctd%3EMethionine%3C%2Ftd%3E%3Ctd%3E0.57%3C%2Ftd%3E%3Ctd%3ETyrosine%3C%2Ftd%3E%3Ctd%3E0.75%3C%2Ftd%3E%3C%2Ftr%3E%3Ctr%3E%3Ctd%3EGlycine%3C%2Ftd%3E%3Ctd%3E0.42%3C%2Ftd%3E%3Ctd%3EPhenylalanine%3C%2Ftd%3E%3Ctd%3E0.78%3C%2Ftd%3E%3Ctd%3EValine%5E%3C%2Ftd%3E%3Ctd%3E1.53%3C%2Ftd%3E%3C%2Ftr%3E%3C%2Ftbody%3E%3C%2Ftable%3E%3C%2Ffigure%3E%3Cp%3E%E2%98%89Naturally%20Occurring%20Amino%20Acids%3C%2Fp%3E%3Cp%3E%E2%99%A2Whey%20Protein%20Isolate%20is%20a%20low%20%26nbsp%3Blactose%20food.%3C%2Fp%3E%3Cp%3E%E2%96%A3No%20rbST%20(From%20cows%20not%20%26nbsp%3Bsupplemented%20with%20rbST.%20No%20significant%20difference%20has%20been%20shown%20between%20milk%20derived%20from%20rbST-supplemented%20and%20non-rbST%20supplemented%20cows).%3C%2Fp%3E%3Cp%3E%5EBranched%20Chain%20Amino%20Acids%26nbsp%3B%3C%2Fp%3E%3Cp%3E%26nbsp%3B%3C%2Fp%3E%3Cp%3E%3Ca%20href%3D%22https%3A%2F%2Fs3.images-iherb.com%2Fcms%2FCGN-01204.jpg%22%3E%3Cstrong%3EiTested%20Verified%3C%2Fstrong%3E%3C%2Fa%3E%3Cstrong%3E%26nbsp%3B%3C%2Fstrong%3E%3C%2Fp%3E%3Ch3%3E%3Cstrong%3ESuggested%20use%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3ECombine%201%20slightly%20rounded%20scoop%20(38g%E2%99%A6)%20with%206-12%20fl.%20oz.%20cold%20water%20or%20the%20liquid%20of%20your%20choice%20(e.g.%20dairy%20milk%2C%20coconut%20milk%2C%20almond%20milk%2C%20rice%20milk%2C%20soy%20milk%2C%20etc.).%20For%20best%20results%2C%20use%20a%20blender-type%20bottle%2C%20shaker%20cup%20or%20electric%20blender.%20Our%20Whey%20Protein%20Isolate%20can%20be%20blended%20with%20a%20spoon%20if%20necessary.%26nbsp%3B%3C%2Fp%3E%3Cp%3E%E2%99%A638%20grams%20per%201%20slightly%20rounded%20scoop%20is%20an%20average.%20Individual%20scooping%20technique%20may%20yield%20slightly%20less%20than%20or%20slightly%20more%20than%2038%20grams.%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EOther%20ingredients%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EMain%20Ingredients%3Cbr%3EWhey%20Protein%20Isolate%20(from%20BOVINE%20MILK)%2C%20Organic%20Cane%20Sugar%2C%20Natural%20Flavors%2C%20Xanthan%20Gum%2C%20Sea%20Salt%2C%20Sunflower%20Lecithin%2C%20Stevia%20Leaf%20Extract.%3C%2Fp%3E%3Cp%3EOther%20Ingredients%3Cbr%3ENone%3C%2Fp%3E%3Cp%3ECONTAINS%3A%20MILK%3C%2Fp%3E%3Cp%3E%3Ci%3EThis%20product%20is%20not%20manufactured%20with%20eggs%2C%20fish%2C%20crustacean%20shellfish%2C%20tree%20nuts%2C%20peanuts%2C%20wheat%2C%20soy%20or%20gluten.%20Produced%20in%20a%20third-party%2C%20audited%20and%20registered%20cGMP%20compliant%20facility%20that%20may%20process%20other%20products%20that%20contain%20these%20allergens%20or%20ingredients.%3C%2Fi%3E%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EWarnings%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EKeep%20out%20of%20reach%20of%20children.%20%26nbsp%3B%3C%2Fp%3E%3Cp%3EAroma%2C%20color%2C%20consistency%2C%20and%20taste%20may%20vary%20slightly%20from%20batch%20to%20batch.%20Sealed%20for%20your%20protection.%20Do%20not%20use%20if%20pouch%20is%20punctured%20or%20seal%20is%20damaged%20or%20broken.%20Best%20stored%20at%20controlled%20room%20temperature%2020%C2%B0C%20to%2025%C2%B0C%20(68%C2%B0F%20to%2077%C2%B0F).%20Improper%20storage%20conditions%2C%20such%20as%20extended%20exposure%20to%20direct%20sunlight%2C%20high%20heat%20%26amp%3B%20humidity%20can%20cause%20product%20degradation%20over%20time.%26nbsp%3B%3C%2Fp%3E%3Cp%3ENOTICE%3A%20Use%20this%20product%20as%20a%20food%20supplement%20only.%20Do%20not%20use%20for%20weight%20reduction.%3C%2Fp%3E%3Cp%3ETHIS%20PRODUCT%20IS%20PACKAGED%20AND%20SOLD%20BY%20WEIGHT%2C%20NOT%20BY%20VOLUME.%20SETTLING%20OF%20CONTENTS%20OCCURS%20OVER%20TIME.%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EDisclaimer%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EWhile%20iHerb%20strives%20to%20ensure%20the%20accuracy%20of%20its%20product%20images%20and%20information%2C%20some%20manufacturing%20changes%20to%20packaging%20and%2For%20ingredients%20may%20be%20pending%20update%20on%20our%20site.%20Although%20items%20may%20occasionally%20ship%20with%20alternate%20packaging%2C%20freshness%20is%20always%20guaranteed.%20We%20recommend%20that%20you%20read%20labels%2C%20warnings%20and%20directions%20of%20all%20products%20before%20use%20and%20not%20rely%20solely%20on%20the%20information%20provided%20by%20iHerb.%3C%2Fp%3E",
            "slug": "very-vanilla-flavor",
            "quantity": "21",
            "sku": "CGN-01204",
            "category_id": 72,
            "is_combination": 0,
            "variants": null,
            "tags": "Whey Protein Isolate,Sports,Protein",
            "created_at": "2024-02-22T05:14:11.000000Z",
            "updated_at": "2024-02-22T13:16:26.000000Z",
            "status": "show",
            "brand": "Whey Protein",
            "brand_id": 41,
            "is_tax_apply": 1,
            "sell_price": "40",
            "images": [
                {
                    "id": 212,
                    "product_id": 203,
                    "name": "https://backend.kingsmankids.com/uploads/products/2024/02/laravel-1fce34a98fb2d010c3fcb600d7076c4f.avif",
                    "original_name": "88.avif"
                }
            ]
        },
        {
            "id": 205,
            "name": "California Gold Nutrition, FOODS - Toasted Coconut Chips, Refined Sugar, 2.96 oz (84 g)",
            "price": "38.00",
            "bar_code": "898220017256",
            "description": "%3Ch3%3E%3Cstrong%3EDescription%3C%2Fstrong%3E%3C%2Fh3%3E%3Cul%3E%3Cli%3E%3Ci%3ECalifornia%20Gold%20Nutrition%20FOODS%26nbsp%3B%3C%2Fi%3E%3Cstrong%3EToasted%20Coconut%20Chips%2C%20Sweetened%26nbsp%3B%3C%2Fstrong%3E%3C%2Fli%3E%3Cli%3EReady%20to%20Eat%20Toasted%20and%20Sweetened%20Coconut%20Slices%3C%2Fli%3E%3Cli%3EEat%20as%20a%20Snack%2C%20Add%20Crunch%20to%20Salads%20and%20Entrees%2C%20Top%20Off%20Yogurt%3C%2Fli%3E%3Cli%3E2%20g%20Protein%20%2F%204%20g%20Fiber%20%2F%200%20g%20Trans%20Fats%3C%2Fli%3E%3Cli%3ESuitable%20for%20Vegetarians%20and%20Vegans%3C%2Fli%3E%3Cli%3EFormulated%20without%20Gluten%2C%20GMOs%2C%20or%20Soy%3C%2Fli%3E%3Cli%3EProduced%20in%20a%203rd%20Party%20Audited%20cGMP%20Registered%20(Certified)%20Facility%3C%2Fli%3E%3Cli%3E100%25%20Gold%20Guarantee%3C%2Fli%3E%3C%2Ful%3E%3Cp%3ESnacking%20is%20where%20many%20people%20abandon%20their%20healthy%20eating%20habits.%20With%20so%20few%20nutritious%20snacking%20options%2C%20it%E2%80%99s%20not%20uncommon%20to%20settle%20for%20an%20unhealthy%20alternative%20when%20you%E2%80%99re%20in%20a%20rush.%20%3Ci%3ECalifornia%20Gold%20Nutrition%20FOODS%3C%2Fi%3E%20%3Cstrong%3EToasted%20Coconut%20Chips%3C%2Fstrong%3E%20can%20solve%20this%20dilemma.%20These%20crisp%2C%20slightly%20sweetened%20chips%20are%20the%20perfect%20way%20to%20satisfy%20your%20snack%20craving%20without%20breaking%20your%20daily%20diet.%26nbsp%3B%3C%2Fp%3E%3Cp%3EOur%20%3Cstrong%3EToasted%20Coconut%20Chips%26nbsp%3B%3C%2Fstrong%3Eare%20made%20from%20fresh%20coconuts%20that%20are%20then%20dried%2C%20toasted%2C%20and%20sweetened%20to%20create%20a%20deliciously%20crunchy%20snack.%20Enjoy%20straight%20from%20the%20bag%20or%20use%20them%20as%20a%20topping%20to%20add%20extra%20crunch%20to%20salads%2C%20yogurt%2C%20smoothies%2C%20or%20entrees.%26nbsp%3B%3C%2Fp%3E%3Ch3%3E%3Cstrong%3ESuggested%20use%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EEnjoy%20straight%20from%20the%20bag%2C%20add%20to%20salads%2C%20yogurt%2C%20smoothies%2C%20trail%20mixes%2C%20and%20even%20on%20entr%C3%A9es.%3C%2Fp%3E%3Cp%3EReseal%20after%20each%20use.%26nbsp%3B%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EOther%20ingredients%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3E%3Cstrong%3EMain%20Ingredients%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3EDesiccated%20Coconut%2C%20Sugar%2C%20Salt.%3C%2Fp%3E%3Cp%3E%3Cstrong%3EOther%20Ingredients%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3ENone%3C%2Fp%3E%3Cp%3EContains%3A%20Tree%20Nuts%20(Coconut)%3C%2Fp%3E%3Cp%3EProduct%20of%20Philippines%3C%2Fp%3E%3Cp%3E%3Ci%3ENot%20manufactured%20with%20milk%2C%20eggs%2C%20fish%2C%20crustacean%20shellfish%2C%20peanuts%2C%20wheat%2C%20soy%2C%20sesame%2C%20or%20gluten.%20Produced%20in%20an%20FDA-registered%2C%20third-party%20audited%2C%20and%20cGMP-compliant%20facility%20that%20may%20process%20other%20products%20that%20contain%20these%20allergens%20or%20ingredients.%3C%2Fi%3E%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EWarnings%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3ESealed%20for%20your%20protection.%20Do%20not%20use%20if%20pouch%20is%20punctured%20or%20seal%20is%20missing%20or%20broken.%20Store%20in%20a%20cool%2C%20dry%20place.%20Protect%20from%20heat%2C%20light%2C%20and%20moisture.%26nbsp%3B%3C%2Fp%3E%3Cp%3ETHIS%20PRODUCT%20IS%20PACKAGED%20AND%20SOLD%20BY%20WEIGHT%2C%20NOT%20BY%20VOLUME.%20SETTLING%20OF%20CONTENTS%20OCCURS%20OVER%20TIME.%26nbsp%3B%3C%2Fp%3E%3Ch3%3E%3Cstrong%3EDisclaimer%3C%2Fstrong%3E%3C%2Fh3%3E%3Cp%3EWhile%20iHerb%20strives%20to%20ensure%20the%20accuracy%20of%20its%20product%20images%20and%20information%2C%20some%20manufacturing%20changes%20to%20packaging%20and%2For%20ingredients%20may%20be%20pending%20update%20on%20our%20site.%20Although%20items%20may%20occasionally%20ship%20with%20alternate%20packaging%2C%20freshness%20is%20always%20guaranteed.%20We%20recommend%20that%20you%20read%20labels%2C%20warnings%20and%20directions%20of%20all%20products%20before%20use%20and%20not%20rely%20solely%20on%20the%20information%20provided%20by%20iHerb.%3C%2Fp%3E",
            "slug": "california-gold-nutrition-foods-toasted-coconut-chips-refined-sugar-2-96-oz-84-g-",
            "quantity": "30",
            "sku": "CGN-01725",
            "category_id": 79,
            "is_combination": 0,
            "variants": null,
            "tags": "Chips,Grocery,Fruit & Vegetables",
            "created_at": "2024-02-23T12:08:54.000000Z",
            "updated_at": "2024-02-23T12:10:06.000000Z",
            "status": "show",
            "brand": "California Gold Nutrition",
            "brand_id": null,
            "is_tax_apply": 0,
            "sell_price": "38",
            "images": [
                {
                    "id": 213,
                    "product_id": 205,
                    "name": "https://backend.kingsmankids.com/uploads/products/2024/02/laravel-01b9355590d69c48b36bbfe8f248db80.avif",
                    "original_name": "7.avif"
                }
            ]
        },
        {
            "id": 90,
            "name": "sd",
            "price": "9.00",
            "bar_code": "as",
            "description": "%3Cp%3Esds%3C%2Fp%3E",
            "slug": "sd",
            "quantity": "0",
            "sku": "fg",
            "category_id": 3,
            "is_combination": 0,
            "variants": null,
            "tags": "[]",
            "created_at": "2024-01-16T07:06:42.000000Z",
            "updated_at": "2024-02-22T05:28:42.000000Z",
            "status": "show",
            "brand": "testing u1",
            "brand_id": 42,
            "is_tax_apply": 1,
            "sell_price": "9",
            "images": []
        },
    ]
    // Cards

    const weeklyData = [
        { id: 1, name: "All" },
        { id: 2, name: "Health & First Aids" },
        { id: 3, name: "Home & Pet" },
        { id: 4, name: "Medicines" },
        { id: 5, name: "Multivitamins & Minerals" },
        { id: 6, name: "Mum & Baby" },
        { id: 7, name: "Vitamins & Supplements" },
    ];
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        className: 'slider-container'
    };
    const banners = [
        { id: 1, src: banner1, alt: 'Banner 1' },
        { id: 2, src: banner2, alt: 'Banner 3' },
        { id: 3, src: banner3, alt: 'Banner 3' },
    ];
    const handleItemClick = (id) => {
        setSelectedItem(id);
    };
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

    const handleScroll = (scrollOffset) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += scrollOffset;
        }
    };

    useEffect(() => {
        const updateCardsPerRow = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1441) {
                setCardsPerRow(4);
            }
            else if (screenWidth >= 1024) {
                setCardsPerRow(3);
            } else if (screenWidth >= 768) {
                setCardsPerRow(2);
            } else {
                setCardsPerRow(1);
            }
        };

        updateCardsPerRow();
        window.addEventListener('resize', updateCardsPerRow);

        return () => {
            window.removeEventListener('resize', updateCardsPerRow);
        };
    }, []);

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -100 / cardsPerRow - 1, 
                behavior: 'smooth'
            });
       }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 100 / cardsPerRow - 1,
                behavior: 'smooth'
            });
        }
    };
    console.log(100 / cardsPerRow - 1)
    console.log("cardsPerRow",cardsPerRow)
    return (
        <div className="custom-header">
            <div className=''>
                {/* <div className='mb-5 overflowHidden'>
                    <Slider {...settings}>
                        {banners.map((banner, index) => (
                            <div key={index}>
                                <img src={banner.src} alt={`Slide ${index + 1}`} className="slider-image" />
                            </div>
                        ))}
                    </Slider>
                </div> */}
                <div className="row mt-5" style={{}}>
                    <div className="col-md-9" style={{}}>
                        <Slider {...settings}>
                            {banners.map((banner, index) => (
                                <div key={index}>
                                    <img src={banner.src} alt={`Slide ${index + 1}`} className="slider-image" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="col-md-3 sidebar_hide">
                        <img src={banner3} alt={"siteBanner"} className="img-fluid" />
                    </div>
                </div>
                <div className="product-list-container mt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex align-items-center">
                                <div className="mr-auto">
                                    <h3 className="bold" style={{ display: 'inline' }}>Weekly Featured Products</h3>
                                    <span className="ml-3 pointer-on-hover">View All</span>
                                    <span className="ml-3 pointer-on-hover">
                                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-right">
                                <span className="circle" onClick={handleScrollRight}>
                                    <i className="fa fa-chevron-right" aria-hidden="true" style={{ color: 'black', lineHeight: '30px', fontSize: 10 }}></i>
                                </span>
                                <span className="circle ml-2" onClick={handleScrollLeft}>
                                    <i className="fa fa-chevron-left" style={{ lineHeight: '30px', fontSize: 10 }} aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2" style={{ overflowX: 'auto' }}>
                        <div className="d-flex" style={{ whiteSpace: 'nowrap' }}>
                            {weeklyData.map((data) => (
                                <div
                                    key={data.id}
                                    className={`customBtn pointer-on-hover m-3 ${selectedItem === data.id ? 'activeBtn' : ''}`}
                                    onClick={() => handleItemClick(data.id)}
                                >
                                    {data.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-3 horizontal-product-display" ref={scrollContainerRef}>
                        <div className="product-list" style={{ flexWrap: 'nowrap' }}>
                            {products.map((product, index) => (
                                <div key={index} className="product-card p-4"
                                    onClick={() => navigate(`/products-details/${product.id}`, { state: { id: product.id } })}
                                    style={{ width: `${100 / cardsPerRow - 1}% ` }}>
                                    <div className="product_image">
                                        {product.images[0]?.name ? (
                                            <ImageComponent src={product.images[0]?.name} alt="products Image" />
                                        ) : (
                                            <p>Image not available</p>
                                        )}
                                    </div>
                                    <div className="product-details">
                                        <p>{product?.brand}</p>
                                        <h3 className="product-title">{truncateString(product?.name, 30)}</h3>
                                        <div className="d-flex mt-3 justify-content-between">
                                            <div>${product?.price}</div>
                                            <div>
                                                <span className="circle" onClick={(event) => addToCart(event, product)}>
                                                    <i className="fas fa-shopping-bag mt-2"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className='row mt-5 mb-5'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex align-items-center'>
                                <div className='mr-auto'>
                                    <h3 className='bold' style={{ display: 'inline' }}>New Products</h3>
                                    <span className='ml-3 pointer-on-hover'>View All</span>
                                    <span className='ml-3 pointer-on-hover'><i className="fa fa-chevron-right" aria-hidden="true"></i></span>
                                </div>
                            </div>
                            <div className='mt-4' style={{ border: '1px solid #ccc', borderRadius: 15 }}>
                                {products.slice(0, 3).map((product, index) => (
                                    <div className='m-5' onClick={() =>
                                        navigate(`/products-details/${product.id}`, {
                                            state: {
                                                id: product.id
                                            }
                                        })
                                    }  >
                                        <div className='row' key={index} style={{ maxHeight: 450 }}>
                                            <div className='col-12 col-md-4 col-lg-5'>
                                                <div className="product_image">
                                                    {product.images[0].name ? (
                                                        <ImageComponent src={product.images[0].name} alt={"products Image"} />) : (
                                                        <p>Image not available</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-8 col-lg-7'>
                                                <div>{product?.brand}</div>
                                                <div className='mt-3'>{truncateString(product?.name, 50)}</div>
                                                <div className='d-flex mt-3 justify-content-between'>
                                                    <div className=''>
                                                        ${product?.price}
                                                    </div>
                                                    <div className=''>
                                                        <span className='circle'>
                                                            <i onClick={(event) => addToCart(event, product)} className="fas fa-shopping-bag mt-2"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='' />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex align-items-center'>
                                <div className='mr-auto'>
                                    <h3 className='bold' style={{ display: 'inline' }}>Products On Sale</h3>
                                    <span className='ml-3 pointer-on-hover'>View All</span>
                                    <span className='ml-3 pointer-on-hover'><i className="fa fa-chevron-right" aria-hidden="true"></i></span>
                                </div>
                            </div>
                            <div className='mt-4' style={{ border: '1px solid #ccc', borderRadius: 15 }}>
                                {products.slice(3, 6).map((product, index) => (
                                    <div className='m-5' onClick={() =>
                                        navigate(`/products-details/${product.id}`, {
                                            state: {
                                                id: product.id
                                            }
                                        })
                                    } >
                                        <div className='row' key={index} style={{ maxHeight: 350 }}>
                                            <div className='col-12 col-md-4 col-lg-5'>
                                                <div className="product_image">
                                                    {product.images[0].name ? (
                                                        <ImageComponent src={product.images[0].name} alt={"products Image"} />) : (
                                                        <p>Image not available</p>
                                                    )}
                                                </div>                                            </div>
                                            <div className='col-12 col-md-8 col-lg-7'>
                                                <div>{product?.brand}</div>
                                                <div className='mt-3'>{truncateString(product?.name, 50)}</div>
                                                <div className='d-flex mt-3 justify-content-between'>
                                                    <div className=''>
                                                        ${product?.price}
                                                    </div>
                                                    <div className=''>
                                                        <span className='circle'>
                                                            <i onClick={(event) => addToCart(event, product)} className="fas fa-shopping-bag mt-2"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='' />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex align-items-center'>
                                <div className='mr-auto'>
                                    <h3 className='bold' style={{ display: 'inline' }}>Top Rated Products</h3>
                                    <span className='ml-3 pointer-on-hover'>View All</span>
                                    <span className='ml-3 pointer-on-hover'><i className="fa fa-chevron-right" aria-hidden="true"></i></span>
                                </div>
                            </div>
                            <div className='mt-4' style={{ border: '1px solid #ccc', borderRadius: 15 }}>
                                {products.slice(6, 9).map((product, index) => (
                                    <div className='m-5' onClick={() =>
                                        navigate(`/products-details/${product.id}`, {
                                            state: {
                                                id: product.id
                                            }
                                        })
                                    } >
                                        <div className='row' key={index} style={{ maxHeight: 350 }}>
                                            <div className='col-12 col-md-4 col-lg-5'>
                                                <div className="product_image">
                                                    {product.images[0].name ? (
                                                        <ImageComponent src={product.images[0].name} alt={"products Image"} />) : (
                                                        <p>Image not available</p>
                                                    )}
                                                </div>                                            </div>
                                            <div className='col-12 col-md-8 col-lg-7'>
                                                <div>{product?.brand}</div>
                                                <div className='mt-3'>{truncateString(product?.name, 50)}</div>
                                                <div className='d-flex mt-3 justify-content-between'>
                                                    <div className=''>
                                                        ${product?.price}
                                                    </div>
                                                    <div className=''>
                                                        <span className='circle'>
                                                            <i onClick={(event) => addToCart(event, product)} className="fas fa-shopping-bag mt-2"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
                <div className='mt-2'>
                    <FooterComponents />
                </div>
            </div>
        </div >
    );
}

export default HomeScreen;
