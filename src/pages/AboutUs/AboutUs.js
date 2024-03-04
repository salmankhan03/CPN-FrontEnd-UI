
import React, { useEffect, useState } from 'react';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider1 from "../../assets/images/banner_aboutus.jpg"
import Slider2 from "../../assets/images/banner_aboutus.jpg"
import Slider3 from "../../assets/images/banner_aboutus.jpg"
import ImageComponent from '../../components/ImageComponents/ImageComponents';
import About from "../../assets/images/aboutUs.jpg"
import icon1 from "../../assets/images/icon_1.png"
import icon2 from "../../assets/images/icon_2.png"
import icon3 from "../../assets/images/icon_3.png"
import icon4 from "../../assets/images/icon_4.png"



const AboutUs = () => {
    const banners = [
        { id: 1, src: Slider1, alt: 'Banner 1' },
        { id: 2, src: Slider2, alt: 'Banner 3' },
        { id: 3, src: Slider3, alt: 'Banner 3' },
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
    return (
        <div className='custom-header'>
            <div className=''>
                <div className='mb-5 '>
                    <Slider {...settings}>
                        {banners.map((banner, index) => (
                            <div key={index}>
                                <img src={banner.src} alt={`Slide ${index + 1}`} className="slider-image" />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className='mt-3'>
                    <div className='row'>
                        <div className='text-center mt-2'>DISCOVER</div>
                        <div className='text-center mt-3'><h4>CANADIAN PINNACLE NUTRITECH</h4></div>
                    </div>
                    <div className='row mt-5'>
                       
                        <div className='col-12 col-md-6 col-lg-6 '>
                            <div className='container'>
                                <div className='product_image'>
                                    <ImageComponent src={About} alt={"products Image"} />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6 order-md-first'>
                            <div className='container'>
                                <div>
                                    <p>At Canadian Pinnacle Nutritech (CPN) we recognize that a healthy body contributes directly to the individual’s overall happiness and success. Our mission is to improve the health of individuals and elevate their quality of life by offering top quality, natural nutritional supplements.</p>
                                    <p>Based in British Columbia, Canada, CPN is a health and wellness company dedicated in presenting only the finest products to support the healthy lifestyle you want to achieve. All our products are 100% manufactured in a Canadian pharmaceutically-grade facility, and all our ingredients are certified and approved by Health Canada. We utilize the best formulas in offering highly effective and nutritional supplements to assist your individual health goals.</p>
                                    <p>We advocate natural, wholesome, and healthy lifestyles – our products are designed in assisting you to pursue the better you. From specific formulas in targeting certain needs to improving your overall bodily health, CPN ensures that you will only receive the best and safest natural health solutions.</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className='mt-3' style={{ backgroundColor: '#f8f0d0' }} >
                    <div className='container'>
                        <div className="row ">
                            <div className='col-12 col-md-3 col-lg-3'>
                                <div className='bg-transparent text-center mt-4'>
                                    <ImageComponent src={icon1} alt={"products Image"} />
                                </div>
                                <div className='text-center mt-2 mb-2'>
                                    Canadian Made
                                </div>
                                <div className='text-center mb-2'>
                                    <p>CPN supplement are 100% formulated, made and packaged in Canada, according to the standards of Health Canada</p>
                                </div>
                            </div>
                            <div className='col-12 col-md-3 col-lg-3'>
                                <div className='bg-transparent text-center mt-4'>
                                    <ImageComponent src={icon2} alt={"products Image"} />
                                </div>
                                <div className='text-center mt-2 mb-2'>
                                    GMP Standard
                                </div>
                                <div className='text-center mb-2'>
                                    <p>All products are manufactured in a controlled and consistently monitored environment to ensure each product meets their quality standard</p>
                                </div>
                            </div>
                            <div className='col-12 col-md-3 col-lg-3'>
                                <div className='bg-transparent text-center mt-4'>
                                    <ImageComponent src={icon3} alt={"products Image"} />
                                </div>
                                <div className='text-center mt-2 mb-2'>
                                    Health Canada
                                </div>
                                <div className='text-center mb-2'>
                                    <p>CPN products have been approved by Health Canada as natural health products, ensuring all products are safe, effective and of high quality</p>
                                </div>
                            </div>
                            <div className='col-12 col-md-3 col-lg-3'>
                                <div className='bg-transparent text-center mt-4'>
                                    <ImageComponent src={icon4} alt={"products Image"} />
                                </div>
                                <div className='text-center mt-2 mb-2'>
                                    FDA Compliance
                                </div>
                                <div className='text-center mb-2'>
                                    <p>Our manufacturing facility meets the GMP standards and has been approved by the US FDA as an acceptable manufacturing facility</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


            </div>
            <div className='mt-2'>
                <FooterComponents></FooterComponents>
            </div>

        </div>
    )
}
export default AboutUs