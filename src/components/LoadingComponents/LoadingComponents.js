import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./LoadingComponents.css"

const Loading = ({ loading, spinner }) => {
    return (
        // <div style={{}}>
        //     <div className="loading-skeleton">
        //         {[...Array(10)].map((_, index) => (
        //             <Skeleton key={index} circle={false} height={'100%'} width={'100%'} />
        //         ))}
        //     </div>
        // </div >
        <div className="loading-container">
            <div className="loading-skeleton">
                {[...Array(10)].map((_, index) => (
                    <Skeleton key={index} height={20} width={'100%'} style={{ marginBottom: '10px' }} />
                ))}
            </div>
        </div>
    );
};

export default Loading;
