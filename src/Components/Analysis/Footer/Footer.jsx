import React from 'react';

import CustomText from '../../CustomText/CustomText';
import language from '../../../Assets/i18n/i18n';
import {ic_arrow} from '../../Images/Images';

const Footer = (props) => {
    const {nextFunc, screenCount, backFunc, line} = props;
    return (
        <div className="footer">
        <div className="footer-right">
            <button className="footer-right-btn" onClick={nextFunc}>
                <div className="footer-right-btn-right">
                    <img className="footer-right-btn-right-ic" src={ic_arrow} alt="arrow" />
                </div>
                <div className="footer-right-btn-left">
                    <CustomText className="footer-right-btn-left-txt">
                        {language('next')}
                    </CustomText>
                </div>
            </button>
        </div>
        <div className="footer-center">
            <div className="footer-center-top">
                <CustomText className="footer-center-top-txt">
                    {screenCount + '/' + 12}
                </CustomText>
            </div>
            <div className="footer-center-bottom">
                <div className="footer-center-bottom-progress">
                    <div className="footer-center-bottom-progress-line" style={{width: line}} />
                </div>
            </div>
        </div>
        <div className="footer-left">
            <button className="footer-left-btn" onClick={backFunc}>
                <div className="footer-left-btn-left">
                    <CustomText className="footer-left-btn-left-txt">
                        {language('back')}
                    </CustomText>
                </div>
                <div className="footer-left-btn-right">
                    <img className="footer-left-btn-right-ic" src={ic_arrow} alt="arrow" />
                </div>
            </button>
        </div>
    </div>
    
    );
};
export default Footer;