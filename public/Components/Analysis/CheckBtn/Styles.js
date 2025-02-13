import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        padding: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1
    },
    btn_ic: {
        width: 20,
        height: 20,
    },
    btn_title: {
        fontSize: 11,
        color: colors.dark_txt,
        marginStart: 5,
    }
});
export default styles;