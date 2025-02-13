import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.rgba
    },
    modal: {
        width: width,
        height: height / 2,
        backgroundColor: colors.white,
        flexDirection: 'column',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    modal_top: {
        flex: 0.9,
        justifyContent: 'center',
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: 0.6
    },
    modal_top_title: {
        fontSize: 14,
        color: colors.black,
        textAlign: 'center'
    },
    modal_list: {
        flex: 1,
        justifyContent: 'center',
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: 0.6
    },
    modal_list_txt: {
        fontSize: 14,
        color: colors.green,
        textAlign: 'center'
    },
    modal_buttom: {
        flex: 1.1,
        borderTopColor: colors.light_gray,
        borderTopWidth: 5,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    modal_buttom_txt: {
        fontSize: 14,
        color: colors.red,
        textAlign: 'center'
    },
    list_left_ic: {
        width: 12,
        height: 12,
        tintColor: colors.green
    },
});
export default styles;