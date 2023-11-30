import React from "react"
function ButtonComponent ({ onClick, label }) {
    return(
        <button className="red_button product-add_to_cart_button" onClick={onClick} >
            {label}
        </button>
)
} export default ButtonComponent