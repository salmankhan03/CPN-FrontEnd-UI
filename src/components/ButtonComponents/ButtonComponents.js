import React from "react"
function ButtonComponent ({ onClick,cssClass, label,disabled, width }) {
    return(
        <button 
            className={`${cssClass ? cssClass :''} red_button product-add_to_cart_button1`} 
            onClick={onClick}
            disabled={disabled}
            style={{width: `${width ? width : 'auto'}`}}
        >
            {label}
        </button>
)
} export default ButtonComponent