import React from 'react';
import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import Collapse from '../../../Components/Collapse/Collapse';
import logo from '../../../Components/Images/logo.png';


function AboutUs({ backAction }) {

    return (
        <div className="flex flex-col bg-white h-full">
            <SimpleHeader
                func={backAction}
                title={'درباره daddy check'}
            />
            <div className="h-24 flex items-center justify-center">
                <img className="w-20 h-20 object-contain" src={logo} alt="logo" />
            </div>
            <div className="flex-1">
                <Collapse
                    title={'درباره اپلیکیشن daddy check'}
                    body={'بیش از 40 درصد علل ناباروری...'} // Add the full body text here
                />
                <Collapse
                    title={'درباره کیت'}
                    body={'به منظور تهیه کیت ددی چک...'} // Add the full body text here
                />
                <Collapse
                    title={'نصب و راه اندازی اپلیکیشن'}
                    body={'برنامه تست باروری ددی چک...'} // Add the full body text here
                />
                <Collapse
                    title={'شرایط و ظوابط'}
                    body={"•به گفته سازمان جهانی بهداشت (WHO)..."} // Add the full body text here
                />
            </div>
        </div>
    );
};

export default AboutUs;
