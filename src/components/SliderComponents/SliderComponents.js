import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ImageComponent from '../ImageComponents/ImageComponents';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner component

const SliderComponents = ({ banners }) => {
    const [index, setIndex] = useState(0);
    const [loadingStates, setLoadingStates] = useState(Array(banners?.length).fill(false)); // Initialize loading states

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
  
    const getPositionClasses = (position,positionCheck) => {
        console.log('position==============================', position)
        if(position) {
            const [vertical, horizontal] = position && position?.split('-');
            let justifyContent = 'center';
            let alignItems = 'center';
            let marginTop = '0';
            switch (vertical) {
                case 'TOP':
                    alignItems = 'flex-start';
                    positionCheck ? marginTop =30  : marginTop=0
                    break;
                case 'MIDDLE':
                    alignItems = 'center';
                    break;
                case 'BOTTOM':
                    alignItems = 'flex-end';
                    break;
                default:
                    alignItems = 'center';
            }

            switch (horizontal) {
                case 'LEFT':
                    justifyContent = 'flex-start';
                    break;
                case 'MIDDLE':
                    justifyContent = 'center';
                    break;
                case 'RIGHT':
                    justifyContent = 'flex-end';
                    break;
                default:
                    justifyContent = 'center';
            }

            return { justifyContent, alignItems,marginTop };
        }
    };
    return (
        <Carousel fade activeIndex={index} onSelect={handleSelect}>
            {banners?.map((banner, idx) => {
                console.log(banner)
                return (
                    <Carousel.Item key={idx} interval={50000}>
                        <ImageComponent src={banner?.src} alt={`Slide ${idx + 1}`} classAtribute="slider-image d-block w-100" />
                        <Carousel.Caption
                        className={`carousel-caption d-flex h-100 p-0 `}
                        style={{
                            ...getPositionClasses(banner?.position)
                        }}
                    >
                        {banner?.content && (
                            <div
                                className="w-full h-full text-white bg-opacity-50 dynamic-html"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: getPositionClasses(banner?.position).justifyContent,
                                    alignItems: getPositionClasses(banner?.position,).alignItems,
                                    marginTop: getPositionClasses(banner?.position,'banner?.position').marginTop,

                                }}
                                dangerouslySetInnerHTML={{ __html: banner?.content }}
                            />
                        )}
                    </Carousel.Caption>

                    </Carousel.Item>
                )
            })}
        </Carousel>
    );
};

export default SliderComponents;
