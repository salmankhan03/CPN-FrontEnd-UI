import React from "react";

function ProductTags({ tags }) {
    return (
      <div className="product-tags-container">
        {tags.map((tag, index) => (
          <span key={index} className="product-tag">
            {tag}
          </span>
        ))}
      </div>
    );
  }

  export default ProductTags;
