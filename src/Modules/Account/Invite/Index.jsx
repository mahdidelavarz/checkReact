import React, { useEffect, useState } from 'react';
import { ImageBackground, StatusBar, BackHandler, Share } from 'react-native';

import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import { inviteBack, ic_back } from '../../../Components/Images/Images';
import CustomText from '../../../Components/CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import Storage from '../../../Factories/Storage';
import language from '../../../Assets/i18n/i18n';
import Store from '../../../Store/Store';

let storage = new Storage();

function Invite(props) {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        storage.get("Profile", data => {
            var res = JSON.parse(data);
            setUserName(res.email);
        });
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const share = () => {
        Share.share({ message: "http://etcco.ir" })
            .then(result => console.log(result))
            .catch(error => console.log(error));
    }

    const backAction = () => {
        Store.incrementTabBar();
        props.history.goBack();
        return true;
    }

    return (
        <ImageBackground className="flex-1 flex flex-col" source={inviteBack}>
            <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
            
            <div className="flex-1 items-start pt-[10px] w-[90%] self-center">
                <button
                    className="w-[40px] h-[40px]"
                    activeOpacity={0.7}
                    onPress={backAction}
                >
                    <img className="w-[25px] h-[25px]" source={ic_back} />
                </button>
            </div>
            
            <div className="flex-4 flex flex-col">
                <div className="flex-3" />
                <div className="flex-7 justify-between">
                    <CustomText font_weight="bold" className="text-[16px] text-center text-dark_green">
                        {userName}
                    </CustomText>
                    <div className="w-[80%] self-center">
                        <CustomText className="text-[12px] w-[92%] self-center text-center leading-[30px] text-ligh_txt">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </CustomText>
                    </div>
                </div>
            </div>

            <div className="flex-1 items-center justify-center">
                <SimpleButton
                    func={share}
                    btnStyle="w-[50%]"
                    title={language("share")}
                    titleStyle=""
                />
            </div>
        </ImageBackground>
    );
}

export default Invite;
