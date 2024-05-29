import React from "react";
import "./SpinnerLoader.css"

const SpinnerLoading = ({ loading, }) => {
    return (

        <div className="page-center-container">
            <div style={{ width: '100%', height: '100%' }}>
                {loading &&
                    <div className="loading-spinner">
                        <span className="loader"></span>
                    </div>
                }
            </div >
        </div>
    );
};

export default SpinnerLoading;
