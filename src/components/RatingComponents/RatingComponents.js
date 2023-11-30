import React from "react";

function RatingComponents({ rating,showReviewCount }) {
    function renderRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }
        if (hasHalfStar) {
            stars.push(<i key={fullStars} className="fas fa-star-half-alt" ></i>);
        }
        return stars;
    }
    return (
      <div className="">
         {renderRatingStars(rating)}
         {showReviewCount ?(
         <span className="pl-3"> 
         <i class="fa fa-angle-down" aria-hidden="true"></i> 78
     </span>):null} 
      </div>
    );
  }

  export default RatingComponents;
