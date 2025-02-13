import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    content: {
        flex: 1,
        flexDirection: 'column',
    },

    top: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    top_img: {
        width: width / 1.7,
        height: width / 1.7,
        resizeMode: 'contain'
    },
    top_txt: {
        fontSize: 14,
        color: colors.dark_txt,
        textAlign: 'center',
        width: '95%',
        alignSelf: 'center'
    },


    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom_btn: {
        width: '60%',
        height: 45,
        backgroundColor: colors.green,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom_btn_txt: {
        fontSize: 16,
        color: colors.white,
        marginRight: 10
    },
    bottom_btn_ic: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        tintColor: colors.white
    },
};;
export default styles;