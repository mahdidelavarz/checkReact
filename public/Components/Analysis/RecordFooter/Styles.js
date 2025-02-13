import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    footer: {
        width: '100%', 
        flexDirection: 'row', 
        height: 50
    },

    footer_flex: {
        flex: 2.5, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    footer_flex_btn: {
        width: '85%',
        height: 30,
        borderRadius: 30,
        borderColor: colors.ligh_txt,
        borderWidth: 1,
        backgroundColor: colors.white,
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    footer_flex_btn_ic: {
        width: 10, 
        height: 10, 
        tintColor: colors.green
    },
    footer_flex_btn_ic_arrow: {
        width: 10, 
        height: 10, 
        tintColor: colors.green,
        transform: [{ rotate: '180deg'}]
    },
    footer_flex_btn_ic_ok: {
        width: 10, 
        height: 10, 
        tintColor: colors.green,
    },
    footer_flex_btn_txt: {
        fontSize: 10, 
        color: colors.dark_txt
    },

    footer_center: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 15,
    },
    footer_center_txt_number: {
        fontSize: 12, 
        color: colors.dark_txt
    },
    footer_center_row: {
        flexDirection: 'row-reverse',
    },
    footer_center_row_step_view: {
        width: 40,
        height: 12,
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop: 5,
        backgroundColor: colors.violet
    },
});
export default styles;