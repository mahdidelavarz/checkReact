import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    header: {
        height: '25%',
        backgroundColor: colors.light_gray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_title: {
        fontSize: 14,
        color: colors.dark_txt
    },

    list: {
        height: '70%',
        marginTop: '3%',
        marginBottom: '2%',
        paddingRight: 5,
        alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
        paddingLeft: 5,
    },
    main_row: {
        backgroundColor: colors.white,
        marginLeft: 5,
        marginRight: 5,
        width: width / 1.3,
        borderRadius: 5,
        borderWidth: 1,
    },
    row: {
        flexDirection: 'row',
        height: '33%',
    },
    row_right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row_right_ic: {
        width: 25,
        height: 25,
        tintColor: colors.green
    },
    row_left: {
        flex: 4,
        justifyContent: 'center',
        paddingRight: 10
    },
    row_left_txt: {
        fontSize: 12,
        color: colors.gray,
        textAlign: 'left'
    },
});
export default styles;