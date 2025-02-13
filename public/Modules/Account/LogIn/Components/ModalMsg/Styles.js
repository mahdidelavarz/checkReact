import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.rgba
    },
    content: {
        width: '80%',
        backgroundColor: colors.white,
        borderRadius: 10,
        alignItems: 'center',
        padding: 5,
        borderColor: colors.ligh_txt,
        borderWidth: 2
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 500,
        borderWidth: 8,
        borderColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.light_gray,
        position: 'absolute',
        top: -50
    },
    circle_ic: {
        width: 30,
        height: 30,
        tintColor: colors.gray
    },
    message: {
        fontSize: 14,
        color: colors.ligh_txt,
        textAlign: 'center',
        width: '85%',
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 15
    },
    btn: {
        width: '50%',
        height: 35,
        borderRadius: 30,
        backgroundColor: colors.green,
        justifyContent: 'center',
    },
    btn_txt: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center'
    }
});
export default styles;