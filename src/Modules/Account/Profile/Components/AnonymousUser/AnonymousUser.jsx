import React from 'react';

import SimpleButton from '../../../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../../../Components/CustomText/CustomText';
import languages from '../../../../../Assets/i18n/i18n';

function AnonymousUser(props) {
    return (
        <div className="flex flex-1 justify-evenly py-8">
            <CustomText font_weight={'bold'} className="text-[18px] text-center text-dark_txt">
                {languages('empty_account_txt')}
            </CustomText>
            <CustomText className="text-[14px] w-[90%] text-center text-ligh_txt self-center mt-2">
                {languages('empty_account_description')}
            </CustomText>
            <div className="w-[60%] self-center">
                <SimpleButton 
                    func={() => props.param.route.history.push('/signUp')}
                    btnStyle="h-10 bg-white border border-dark_green mb-2.5 mt-4" 
                    title={languages('signup')} 
                    titleStyle="text-green"
                />
                <SimpleButton 
                    func={() => props.param.route.history.push('/signIn')}
                    btnStyle="h-10" 
                    title={languages('login')} 
                />
            </div>
        </div>
    );
}

export default AnonymousUser;
