import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../../../../Assets/Styles/Colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.rgba
    },
    content: {
        width: width,
        height: height / 2,
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderRadius: 15
    },
    title_date: {
        fontFamily: "iranyekanwebbold(fanum)",
        fontSize: 11
    },
    btn_close: {
        position: 'absolute',
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: colors.white,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    btn_close_ic: {
        width: 30,
        height: 30,
        tintColor: colors.red
    }
});
export default styles;