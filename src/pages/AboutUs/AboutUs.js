
import React, { useEffect, useState } from 'react';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useSelector } from 'react-redux';

import Slider1 from "../../assets/images/banner_aboutus.jpg"
import Slider2 from "../../assets/images/banner_aboutus.jpg"
// import Slider3 from "../../assets/images/banner/banner3.jpg"
import ImageComponent from '../../components/ImageComponents/ImageComponents';
import SliderComponents from '../../components/SliderComponents/SliderComponents';
import About from "../../assets/images/aboutUs.jpg"
import icon1 from "../../assets/images/icon_1.png"
import icon2 from "../../assets/images/icon_2.png"
import icon3 from "../../assets/images/icon_3.png"
import icon4 from "../../assets/images/icon_4.png"


const AboutUs = () => {
    const banners = [
        { id: 1, src: Slider1, alt: 'Banner 1' },
        { id: 2, src: Slider2, alt: 'Banner 3' },
        // { id: 3, src: Slider3, alt: 'Banner 3' },
    ];
    return (
        <div className=''>

            <div className='mb-5 '>        
                <SliderComponents banners={banners} />
            </div>
            <div className='custom-container'>
                <div className='mt-3'>
                    <div className='row'>
                        <div className='text-center mt-2'>
                            <h3 className='titles titleColor'>DISCOVER</h3>
                        </div>
                        <div className='text-center mt-3'>
                        <h5 className='titleColor tab-title'>CANADIAN PINNACLE NUTRITECH</h5></div>
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
                                    <p className='tab-title font-weight-normal'>At Canadian Pinnacle Nutritech (CPN) we recognize that a healthy body contributes directly to the individual’s overall happiness and success. Our mission is to improve the health of individuals and elevate their quality of life by offering top quality, natural nutritional supplements.</p>
                                    <p className='tab-title font-weight-normal'>Based in British Columbia, Canada, CPN is a health and wellness company dedicated in presenting only the finest products to support the healthy lifestyle you want to achieve. All our products are 100% manufactured in a Canadian pharmaceutically-grade facility, and all our ingredients are certified and approved by Health Canada. We utilize the best formulas in offering highly effective and nutritional supplements to assist your individual health goals.</p>
                                    <p className='tab-title font-weight-normal'>We advocate natural, wholesome, and healthy lifestyles – our products are designed in assisting you to pursue the better you. From specific formulas in targeting certain needs to improving your overall bodily health, CPN ensures that you will only receive the best and safest natural health solutions.</p>
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
                                   <h4 className='sidebar-filter-section'>Canadian Made</h4>
                                </div>
                                <div className='text-center mb-2'>
                                <p className='tab-title font-weight-normal'>CPN supplement are 100% formulated, made and packaged in Canada, according to the standards of Health Canada</p>
                                </div>
                            </div>
                            <div className='col-12 col-md-3 col-lg-3'>
                                <div className='bg-transparent text-center mt-4'>
                                    <ImageComponent src={icon2} alt={"products Image"} />
                                </div>
                                <div className='text-center mt-2 mb-2'>
                                <h4 className='sidebar-filter-section'>GMP Standard</h4>
                                </div>
                                <div className='text-center mb-2'>
                                <p className='tab-title font-weight-normal'>All products are manufactured in a controlled and consistently monitored environment to ensure each product meets their quality standard</p>
                                </div>
                            </div>
                            <div className='col-12 col-md-3 col-lg-3'>
                                <div className='bg-transparent text-center mt-4'>
                                    <ImageComponent src={icon3} alt={"products Image"} />
                                </div>
                                <div className='text-center mt-2 mb-2'>
                                <h4 className='sidebar-filter-section'>Health Canada</h4>
                                </div>
                                <div className='text-center mb-2'>
                                <p className='tab-title font-weight-normal'>CPN products have been approved by Health Canada as natural health products, ensuring all products are safe, effective and of high quality</p>
                                </div>
                            </div>
                            <div className='col-12 col-md-3 col-lg-3'>
                                <div className='bg-transparent text-center mt-4'>
                                    <ImageComponent src={icon4} alt={"products Image"} />
                                </div>
                                <div className='text-center mt-2 mb-2'>
                                    <h4 className='sidebar-filter-section'>FDA Compliance</h4>
                                </div>
                                <div className='text-center mb-2'>
                                <p className='tab-title font-weight-normal'>Our manufacturing facility meets the GMP standards and has been approved by the US FDA as an acceptable manufacturing facility</p>
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