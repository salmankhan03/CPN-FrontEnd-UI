import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ImageComponent from '../ImageComponents/ImageComponents';

const SliderComponents = ({ banners }) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel fade activeIndex={index} onSelect={handleSelect}>
            {banners.map((banner, idx) => (
                <Carousel.Item key={idx} interval={1500}>
                    <ImageComponent src={banner?.src} alt={`Slide ${idx + 1}`} classAtribute="slider-image d-block w-100" />
                    <Carousel.Caption className={`custom-caption ${banner?.position === "LEFT" ? 'text-left' : banner?.position === "CENTER" ? 'text-center' : 'text-right'}`}>
                        <h3 className='text-black mobile-fonts'>{banner.heading}</h3>
                        <p>{banner.content}</p>
                        <a href={banner.button_url} className="btn btn-primary">{banner.button_label}</a>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
export default SliderComponents;
