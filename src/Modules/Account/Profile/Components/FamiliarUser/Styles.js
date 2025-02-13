import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        paddingTop: 25,
        zIndex: -1
    },

    row: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '95%',
        height: 60,
        // marginTop: 10,
        // borderRadius: 5,
        borderColor: colors.light_gray,
    },
    row_right: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row_right_ic: {
        width: 25,
        height: 25,
        tintColor: colors.green,
        resizeMode: 'contain'
    },

    row_center: {
        flex: 7.5,
        justifyContent: 'center',
    },
    row_center_txt: {
        fontSize: 16,
        width: '90%',
        color: colors.dark_txt,
        textAlign: 'left'
    },

    row_left: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row_left_ic: {
        width: 10,
        height: 10,
        tintColor: colors.ligh_txt
    },
    test: {
        position: 'absolute',
        alignSelf: 'flex-end',
        color: colors.green,
        fontSize: 18
    },

    // content: {
    //     backgroundColor: colors.white,
    //     flex: 9,
    //     width: '90%',
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     borderColor: colors.ligh_txt,
    //     flexDirection: 'column'
    // },
    content_top: {
        flex: 2.2,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content_top_img: {
        width: 70,
        height: 70
    },
    content_top_txt: {
        fontSize: 16
    },

    content_center: {
        flex: 6.5,
        padding: 10,
    },
    content_center_txt: {
        fontSize: 11,
        lineHeight: 25,
        textAlign: 'center',
        color: colors.ligh_txt,
    },

    content_bottom: {
        flex: 1.3,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content_bottom_check_btn: {
        flexDirection: 'row'
    },
    content_bottom_check_btn_ic: {
        width: 20,
        height: 20,
    },
    content_bottom_check_btn_txt: {
        fontSize: 10,
        color: colors.ligh_txt,
        marginStart: 5,
    },
    content_bottom_btn: {
        width: '80%',
        height: 35,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green
    },
    content_bottom_btn_txt: {
        fontSize: 14, color: colors.white
    }
};;
export default styles;