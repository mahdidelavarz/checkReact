import React from 'react';
import ReactModal from 'react-modal';

function LoadingModal(props) {
    const { isVisible } = props;

    return (
        <ReactModal
            isOpen={isVisible}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            overlayClassName="fixed inset-0"
        >
            <div className="flex items-center justify-center w-full h-full">
                <div className="w-1/2 h-1/2 bg-white rounded-lg border border-green-500 flex items-center justify-center">
                    <img 
                        src="/Images/loading" 
                        alt="Loading" 
                        className="w-11/12 h-11/12 object-cover"
                    />
                </div>
            </div>
        </ReactModal>
    );
}

export default LoadingModal;