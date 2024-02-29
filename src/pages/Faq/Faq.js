
import React, { useEffect, useState } from 'react';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider1 from "../../assets/images/banner_faq.jpg"
import Slider2 from "../../assets/images/banner_faq.jpg"
import Slider3 from "../../assets/images/banner_faq.jpg"
import ImageComponent from '../../components/ImageComponents/ImageComponents';
import About from "../../assets/images/aboutUs.jpg"


const Faq = () => {
    const banners = [
        { id: 1, src: Slider1, alt: 'Banner 1' },
        { id: 2, src: Slider2, alt: 'Banner 3' },
    ];
    const faqData = [
        {
            id: 1,
            question: 'How do I know if CPN products are safe? How are natural health products regulated in Canada?',
            answer: 'All natural health products sold in Canada are subject to the Natural Health Products Regulations which came into effect in January 2004. The regulations provide Canadians with access to safe, effective, high quality natural health product which are approved by Health Canada. To be legally sold in Canada, all-natural health products must have a product license, and the Canadian sites that manufacture, package, label and import these products must also have site licenses.To get product and site licenses, specific labelling and packaging requirements must be met, good manufacturing practices must be followed, and proper safety and efficacy evidence must be provided. CPN products are approved by Health Canada. Find out more about the Natural Health Products Regulations.'
        },
        {
            id: 2,
            question: 'What is Health Canada?',
            answer: 'Health Canada is the Federal department of Canada that is responsible for helping Canadians maintaining and improving their health. In relation to natural health products, Health Canada is the regulatory body in assessing and issuing approvals for all health natural health product which can be legally sold in Canada.'
        },
        {
            id: 3,
            question: 'What are Good Manufacturing Practices (GMP)?',
            answer: 'GMP are Global standards of practices for any manufacturing facility to ensure that all natural health products are consistently manufactured and controlled to meet the quality standards appropriate to the natural health products’ intended use.'
        },
        {
            id: 4,
            question: 'What is the FDA?',
            answer: 'The US Food and Drugs Administration is a Federal department in United States, in charge of protecting the public health. In relation to natural health products, FDA is responsible in ensuring the safety, efficacy, and security of all natural products meets the FDA quality standards.'
        },
        {
            id: 3,
            question: 'Should I let my doctor know that I will be using any supplements?',
            answer: 'It is recommended that you should let your health care practitioners know you are taking supplements or ask for their advice before taking it.'
        },
        // Add more FAQ items as needed
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
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
        }
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
                        <div className='text-center mt-2'>READ OUR</div>
                        <div className='text-center mt-3'><h4>FREQUENTLY ASKED QUESTIONS</h4></div>
                    </div>
                    <div className='mt-5'>
                        <div className="container">
                            <div className="faq-list">
                                {faqData.map((item) => (
                                    <>
                                        <div key={item.id} className="faq-item ">
                                            <div className="faq-question  mt-3" onClick={() => toggleExpand(item.id)}>
                                                <h4>{item.question}</h4>
                                                <span className={`faq-icon`}>
                                                    {/*<span className={`faq-icon ${expandedId === item.id ? 'open' : ''}`}> */}
                                                    <i className={expandedId === item.id ? 'fas fa-minus faq-icon-color' : 'fas fa-plus faq-icon-color'} ></i>
                                                    {/* <i className="fas fa-minus"></i> */}

                                                </span>
                                            </div>
                                            {expandedId === item.id && (
                                                <div className="faq-answer pt-4 pb-2">
                                                    <p>{item.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                        <hr></hr>
                                    </>
                                ))}
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
export default Faq