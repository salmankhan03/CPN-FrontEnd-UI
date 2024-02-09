import React from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./LoadingComponents.css"
const Loading = ({ skNumber }) => {
    return (
        // <div className="mt-5">
        //      <Skeleton
        //     count={skNumber}
        //     />
        // </div>
        <div className="loader-container text-center">
            loading...
        </div>

    )
}
export default Loading;
