import React from 'react';

const Row = ({ imgSrc, label, event, keyboardType, defaultValue, mode, func, date, onRef, onSubmitEditing }) => {
    return (
        <div className="w-[95%] mx-auto h-20 flex flex-row border-b border-gray-300 justify-center">
            <div className="flex-1 flex items-center justify-center">
                <img className="w-5 h-5 text-green-500" src={imgSrc} alt="icon" />
            </div>
            <div className="flex-[2.5] flex justify-center">
                <span className="text-sm text-gray-500 ml-1">{label}</span>
            </div>
            <div className="flex-[6.5] flex justify-center">
                {mode === 'date' ? (
                    <button 
                        className="w-full h-1/2 rounded-full px-4 py-2 border border-green-500"
                        onClick={func}
                    >
                        <span className="text-sm text-black text-center">{date}</span>
                    </button>
                ) : (
                    <input
                        className="w-full h-1/2 text-sm border border-green-500 text-gray-500 rounded-full px-4 py-2 text-center"
                        onChange={event}
                        type={keyboardType === 'numeric' ? 'number' : 'text'}
                        defaultValue={defaultValue}
                        ref={onRef}
                        onKeyPress={(e) => e.key === 'Enter' && onSubmitEditing()}
                    />
                )}
            </div>
        </div>
    );
};

export default Row;