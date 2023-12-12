import React from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = ({skNumber}) => {
    return (
        <div className="mt-5">
             <Skeleton
            count={skNumber}
            />
        </div>
       
    )
}
export default Loading;
