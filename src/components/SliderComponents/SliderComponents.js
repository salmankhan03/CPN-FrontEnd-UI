import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ImageComponent from '../ImageComponents/ImageComponents';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner component

const SliderComponents = ({ banners }) => {
    const [index, setIndex] = useState(0);
    const [loadingStates, setLoadingStates] = useState(Array(banners.length).fill(false)); // Initialize loading states

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handleButtonClick = (url, idx) => {
        const newLoadingStates = [...loadingStates];
        newLoadingStates[idx] = true;
        setLoadingStates(newLoadingStates);

        setTimeout(() => {
            window.location.href = url;
        }, 2000);
    };

    return (
        <Carousel fade activeIndex={index} onSelect={handleSelect}>
            {banners?.map((banner, idx) => (
                <Carousel.Item key={idx} interval={50000}>
                    <ImageComponent src={banner?.src} alt={`Slide ${idx + 1}`} classAtribute="slider-image d-block w-100" />
                    <Carousel.Caption className={`carousel-caption d-flex flex-column justify-content-center h-100 ${banner?.position === "LEFT" ? 'text-left align-items-start' : banner?.position === "CENTER" ? 'text-center align-items-center' : 'text-right align-items-end'}`}   >
                        <p className='carouselCaptionHeading text-black mb-0'>{banner.heading}</p>
                        <p>{banner.content}</p>
                        {banner.button_url !== "undefined" && banner.button_label !== "undefined" && (
                            <Button
                                onClick={() => handleButtonClick(banner.button_url, idx)}
                                className="btn btn-primary w-auto"
                                style={{ width: 'auto', minWidth: '150px' }}
                                disabled={loadingStates[idx]}
                            >
                                {loadingStates[idx] ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    banner.button_label
                                )}
                            </Button>
                        )}

                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default SliderComponents;
