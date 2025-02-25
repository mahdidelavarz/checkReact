import React from 'react';
import loading from '../Images/loading.gif';

function Loading() {
    return (
        <div className="flex items-center justify-center bg-white w-full h-full">
            <img className="w-1/3 h-1/3" src={loading} alt="loading" />
        </div>
    );
};

export default Loading;
