import React from 'react';
import '../../assets/css/style.css'

function ImageComponent({ src, alt, classAtribute, width}) {
    const setCartWidth = width === true && '-webkit-fill-available'

    return (
        <img src={src} alt={alt} className={classAtribute} style={{width: setCartWidth}} />
    );
}

export default ImageComponent;