import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    content: {
        flex: 1,
        flexDirection: 'column'
    },

    top: {
        height: 200, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15,
    },
    top_img: {
        width: width / 2.5,
        height: width / 2.5,
        resizeMode: 'contain'
    },

    description: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    description_title: {
        fontSize: 16,
        color: colors.dark_txt,
        textAlign: 'center',
        marginTop: 10,
    },
    description_txt: {
        fontSize: 12,
        color: colors.dark_txt,
        textAlign: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: 15
    },

    check: {
        height: 200,
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
        backgroundColor: colors.green
    },
    check_btn_ic: {
        width: 20,
        height: 20,
    },
    check_btn_txt: {
        fontSize: 11,
        color: colors.white,
        marginStart: 5,
    },

    footer: {
        justifyContent: 'center',
    }
};;
export default styles;