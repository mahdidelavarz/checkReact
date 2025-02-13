import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.rgba
    },

    content: {
        height: height / 3,
        backgroundColor: colors.white,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    content_header: {
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: colors.light_gray,
        borderBottomWidth: 3
    },
    content_header_ic: {
        width: 30,
        height: 30,
        tintColor: colors.red
    },
    content_body: {
        height: '80%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    content_body_txt: {
        fontSize: 14,
    },
    content_body_btn: {
        width: '50%',
    }
    // textStyle:{   
    //     fontSize: 25,   
    //     textAlign: 'center',  
    //     fontFamily: 'iranyekanwebregular(fanum)'
    // },  
    // pickerStyle:{  
    //     width: "100%",  
    //     color: colors.dark_txt,  
    // },
    // row: {
    //     flexDirection: 'row'
    // },
    // row_right: {
    //     flex: 2,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // row_right_txt: {
    //     fontSize: 14,
    //     color: colors.dark_txt,
    // },
    // row_left: {
    //     flex: 8,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },

    // flex: {
    //     width: '100%',

    // },
    // content_center_txt: {
    //     fontSize: 11,
    //     lineHeight: 25,
    //     textAlign: 'center',
    //     color: colors.ligh_txt,
    // },

    // content_bottom: {
    //     flex: 1.3,
    //     alignItems: 'center',
    //     justifyContent: 'space-around',
    // },
    // content_bottom_check_btn: {
    //     flexDirection: 'row'
    // },
    // content_bottom_check_btn_ic: {
    //     width: 20,
    //     height: 20,
    // },
    // content_bottom_check_btn_txt: {
    //     fontSize: 10,
    //     color: colors.ligh_txt,
    //     marginStart: 5,
    // },
    // content_bottom_btn: {
    //     width: '80%',
    //     height: 35,
    //     borderRadius: 30,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: colors.green
    // },
    // content_bottom_btn_txt: {
    //     fontSize: 14, color: colors.white
    // }
};;
export default styles;