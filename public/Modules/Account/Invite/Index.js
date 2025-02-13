import React, { useEffect, useState } from 'react';
import { ImageBackground, StatusBar, BackHandler, TouchableOpacity, Image, View, ScrollView, Share } from 'react-native';

import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import { inviteBack, ic_back } from '../../../Components/Images/Images';
import CustomText from '../../../Components/CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import Storage from '../../../Factories/Storage';
import language from '../../../Assets/i18n/i18n';
import Store from '../../../Store/Store';
import styles from './Styles';

let storage = new Storage();
function Invite(props) {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        storage.get("Profile", data => {
            var res = JSON.parse(data);
            setUserName(res.email);
        }); // دریافت نام کاربر از لوکال استوریج
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
        <ImageBackground style={styles.container} source={inviteBack}>
            <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
            <View style={styles.flex_up}>
                <TouchableOpacity
                    style={styles.flex_up_btn_back}
                    activeOpacity={0.7}
                    onPress={backAction}
                >
                    <Image style={styles.flex_up_btn_back_ic} source={ic_back} />
                </TouchableOpacity>
            </View>
            <View style={styles.flex_center}>
                <View style={styles.flex_center_up} />
                <View style={styles.flex_center_down}>
                    <CustomText font_weight={'bold'} style={styles.flex_center_down_userName_txt}>
                        {userName}
                    </CustomText>
                    <ScrollView style={styles.flex_center_down_scroll} showsVerticalScrollIndicator={false}>
                        <CustomText style={styles.flex_center_down_scroll_txt}> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. </CustomText>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.flex_down}>
                <SimpleButton
                    func={share}
                    btnStyle={{ width: '50%' }}
                    title={language("share")}
                    titleStyle={{}}
                />
            </View>
        </ImageBackground>
    );
};
export default Invite;