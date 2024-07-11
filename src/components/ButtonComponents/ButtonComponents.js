import React from "react"
function ButtonComponent ({ onClick,cssClass, label,disabled }) {
    return(
        <button 
            className={`${cssClass ? cssClass :''} red_button product-add_to_cart_button1`} 
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
)
} export default ButtonComponent