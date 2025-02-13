import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../Assets/Styles/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'column'
    },
    top: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom_img: {
        width: '80%',
        height: '80%'
    },
    btn_retry: {
        width: '50%',
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: colors.green
    },
    btn_retry_txt: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center'
    }
});
export default styles;