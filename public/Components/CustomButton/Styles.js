import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    simple_btn: {
        width: '100%',
        height: 35,
        backgroundColor: colors.green,
        borderRadius: 30,
        justifyContent: 'center'
    },
    simple_btn_txt: {
        fontSize: 15,
        color: colors.white,
        textAlign: 'center'
    }
});
export default styles;