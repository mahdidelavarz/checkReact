import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 10
    },
    header: {
        flex: 1,
        justifyContent: 'center'
    },
    header_txt: {
        fontSize: 14,
        textAlign: 'center',
        color: colors.white
    },
    header_btn: {
        position: 'absolute',
        top: 8,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_btn_ic: {
        width: 25,
        height: 25,
    },

    content: {
        backgroundColor: colors.white,
        flex: 9,
        width: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.ligh_txt,
        flexDirection: 'column'
    },
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
        justifyContent: 'space-between',
        paddingBottom: 2,
    },
    content_bottom_check_btn: {
        flexDirection: 'row'
    },
    content_bottom_check_btn_ic: {
        width: 20,
        height: 20,
    },
    content_bottom_check_btn_txt: {
        fontSize: 11,
        // color: colors.black,
        marginStart: 5,
    },
    content_bottom_btn: {
        width: '70%',
        height: 35,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green
    },
    content_bottom_btn_txt: {
        fontSize: 16,
        color: colors.white
    }
};;
export default styles;