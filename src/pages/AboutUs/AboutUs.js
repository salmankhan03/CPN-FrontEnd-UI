
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
                        <div className='col-6 col-md-6 col-lg-6'>
                            <div className='container mr-3'>
                                <div>
                                    <p>At Canadian Pinnacle Nutritech (CPN) we recognize that a healthy body contributes directly to the individual’s overall happiness and success. Our mission is to improve the health of individuals and elevate their quality of life by offering top quality, natural nutritional supplements.</p>
                                    <p>Based in British Columbia, Canada, CPN is a health and wellness company dedicated in presenting only the finest products to support the healthy lifestyle you want to achieve. All our products are 100% manufactured in a Canadian pharmaceutically-grade facility, and all our ingredients are certified and approved by Health Canada. We utilize the best formulas in offering highly effective and nutritional supplements to assist your individual health goals.</p>
                                    <p>We advocate natural, wholesome, and healthy lifestyles – our products are designed in assisting you to pursue the better you. From specific formulas in targeting certain needs to improving your overall bodily health, CPN ensures that you will only receive the best and safest natural health solutions.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-6 col-md-6 col-lg-6'>
                            <div className='container ml-3'>
                                <div>
                                    <ImageComponent src={About} alt={"products Image"} />
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