import React from 'react';

function ImageComponent({ src, alt, classAtribute}) {
    return (
        <img src={src} alt={alt} className={classAtribute} />
    );
}

export default ImageComponent;