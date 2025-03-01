import React, { useState } from 'react';

function Keyboard(props) {
    const [numbers] = useState([
        { number: 1, id: 1 },
        { number: 2, id: 2 },
        { number: 3, id: 3 },
        { number: 4, id: 4 },
        { number: 5, id: 5 },
        { number: 6, id: 6 },
        { number: 7, id: 7 },
        { number: 8, id: 8 },
        { number: 9, id: 9 },
        { number: '*', id: 10 },
        { number: 0, id: 11 }
    ]);
    const [active, setActive] = useState(false);

    const { func } = props;
    return (
        <div className="flex flex-wrap w-full">
            {
                numbers.map((item) => (
                    <button
                        key={item.id}
                        className="w-1/3 h-12 mt-1 justify-center"
                        activeOpacity={0.5}
                        onPress={() => { func(item); setActive(true) }}
                    >
                        {item.id == 10 && active == false ? null :
                            <span className={item.id == 10 ? 'text-center text-red-500 text-2xl' : 'text-center text-green-500 text-xl font-bold'}>
                                {item.number}
                            </span>
                        }
                    </button>
                ))
            }
        </div>
    );
};
export default Keyboard;
