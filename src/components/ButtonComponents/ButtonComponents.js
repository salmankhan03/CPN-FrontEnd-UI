import React from "react"
function ButtonComponent ({ onClick,cssClass, label }) {
    return(
        <button className={`${cssClass ? cssClass :''} red_button product-add_to_cart_button1`} onClick={onClick}>
            {label}
        </button>
)
} export default ButtonComponent