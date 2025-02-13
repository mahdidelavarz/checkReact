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
        flex: 1
    },

    top: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    top_img: {
        width: width / 1.7,
        height: width / 1.7
    },
    top_txt: {
        fontSize: 18,
        color: colors.dark_txt,
    },

    description: {
        height: 250,
        justifyContent: 'center',
    },
    description_txt: {
        width: '90%',
        alignSelf: 'center',
        fontSize: 12,
        textAlign: 'center'
    },

    check: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    check_btn: {
        flexDirection: 'row',
        padding: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: colors.green,
        borderWidth: 1
    },
    check_btn_ic: {
        width: 20,
        height: 20,
    },
    check_btn_txt: {
        fontSize: 11,
        color: colors.dark_txt,
        marginStart: 5,
    },

    footer: {
        justifyContent: 'flex-end',
    }
};;
export default styles;