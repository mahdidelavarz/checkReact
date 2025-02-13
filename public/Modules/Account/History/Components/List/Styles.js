import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    list: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'column',
        marginTop: 10
    },

    list_top: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: 0.7,
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: colors.light_gray,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    list_top_btn: {
        height: 25,
        padding: 10,
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: colors.green,
    },
    list_top_title_txt: {
        color: colors.dark_green,
        textAlign: 'center',
        fontSize: 18,
    },
    list_top_title: {
        fontSize: 16,
        color: colors.dark_green,
        textAlign: 'center',
    },
    list_top_more_txt: {
        fontSize: 12,
        color: colors.ligh_txt,
        textAlign: 'right',
    },
    list_top_ic: {
        width: 10,
        height: 10,
        tintColor: colors.ligh_txt,
        transform: [{ rotate: '180deg' }],
    },

    list_center: {
        flex: 8,
        justifyContent: 'space-evenly',
    },
    list_center_view: {
        height: 40,
        width: '90%',
        alignSelf: 'center',
        borderBottomColor: colors.light_gray,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    list_center_txt: {
        fontSize: 14,
        color: colors.dark_txt,
    },
    ligh_btn_more: {
        width: '100%',
        height: 40,
        backgroundColor: colors.green,
        justifyContent: 'center',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    ligh_btn_more_txt: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
    },
});
export default styles;
