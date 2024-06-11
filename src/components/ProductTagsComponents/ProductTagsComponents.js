import React from "react";

function ProductTags({ tags }) {
    return (
      <div className="product-tags-container">
        {tags?.map((tag, index) =>{
          console.log("tag",tag)
          return (
          <span key={index} className="product-tag">
            {tag?.name}
          </span>
        )})}
      </div>
    );
  }

  export default ProductTags;
