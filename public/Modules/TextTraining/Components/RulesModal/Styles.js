import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.rgba
    },
    border: {
        width: '95%',
        height: height - width / 3,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: "dotted"
    },
    content: {
        width: '97%',
        backgroundColor: colors.white,
        height: '98%',
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: colors.red
    },
    content_message: {
        fontSize: 12,
        textAlign: 'center',
        color: colors.black,
        width: '95%',
        alignSelf: 'center',
        lineHeight: 30,
    },
    btn: {
        position: 'absolute',
        bottom: 5,
        width: 70,
        height: 35,
        borderRadius: 30,
        borderWidth: 1.2,
        borderColor: colors.green,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn_txt: {
        color: colors.white,
        fontSize: 14
    }
});
export default styles;