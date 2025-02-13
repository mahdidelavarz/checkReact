import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';

import CustomText from '../CustomText/CustomText';
import { ic_arrow } from '../Images/Images';

function Collapse(props) {
    const [isOpen, setOpen] = useState(false);
    const { title, body } = props;

    return (
        <div className="w-11/12 self-center my-2.5">
            <button
                className="flex flex-row h-11 bg-green-500 rounded-t-lg"
                activeOpacity={0.8}
                onPress={() => setOpen(!isOpen)}
            >
                <div className="flex-9 justify-center">
                    <CustomText font_weight={'bold'} className="text-sm text-white text-left ml-2">
                        {title}
                    </CustomText>
                </div>
                <div className="flex-1 items-center justify-center">
                    <img className={`w-4 h-4 text-white transform ${isOpen ? 'rotate-270' : 'rotate-90'}`}
                        src={ic_arrow}
                    />
                </div>
            </button>
            {isOpen ? 
                <Animatable.div animation="fadeInUp" className="rounded-b-lg bg-white border border-green-500 justify-center">
                    <Animatable.span className="text-xs text-black text-center w-11/12 self-center leading-7 font-iranyekanregular">
                        {body}
                    </Animatable.span>
                </Animatable.div> 
                : null
            }
        </div>
    );
};
export default Collapse;
