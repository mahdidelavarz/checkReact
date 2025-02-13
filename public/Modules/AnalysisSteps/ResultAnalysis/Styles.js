import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    header: {
        width: width,
        height: 60,
        backgroundColor: colors.white,
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
    },
    header_title: {
        fontSize: 16,
        color: colors.dark_txt,
        textAlign: 'center',
    },


    content: {
        flex: 1,
        justifyContent: 'space-around',
        paddingTop: 0,
        paddingBottom: 0
    },

    // content_top: {
    //     flex: 1, 
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // content_top_img: {
    //     width: width / 2.5,
    //     height: width / 2.5,
    //     resizeMode: 'contain',
    // },


    content_center: {
        flex: 4,
        justifyContent: 'center',
    },
    content_center_txt: {
        fontSize: 14,
        color: colors.black,
        textAlign: 'left',
        width: '90%',
        alignSelf: 'center'
    },


    content_bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_bottom_btn: {
        width: '80%',
        height: 45,
        backgroundColor: colors.green,
        borderRadius: 30,
        justifyContent: 'center',
    },
    content_bottom_btn_txt: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
    }
});
export default styles;