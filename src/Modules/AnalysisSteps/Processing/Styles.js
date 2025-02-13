import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
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
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    content_message: {
        fontSize: 16,
        color: colors.black
    },
    content_circle: {
        width: width / 3,
        height: width / 3,
        borderRadius: 500,
        borderWidth: 1,
        borderColor: colors.ligh_txt,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_circle_btn: {
        width: width / 3.2,
        height: width / 3.2,
        borderRadius: 500,
        borderWidth: 1,
        borderColor: colors.ligh_txt,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_circle_btn_img: {
        width: 80,
        height: 80,
        tintColor: colors.green
    }
};;
export default styles;