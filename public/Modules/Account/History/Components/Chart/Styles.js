import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../../../../Assets/Styles/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    card: {
        width: '100%',
        alignSelf: 'center',
        marginVertical: 10,
        borderColor: colors.dark_blue,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    card_header: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.light_gray
    },
    card_header_title: {
        fontSize: 16,
        color: colors.black
    },

    top: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bottom: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 4
    },
    bottom_row: {
        width: '80%',
        flexDirection: 'row',
        backgroundColor: colors.light_gray,
        padding: 5,
        borderRadius: 5,
    },
    bottom_row_flex: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row-reverse',
    },
    bottom_row_flex_line: {
        width: 5,
        height: 30,
    },
    bottom_row_flex_txt: {
        fontSize: 14,
        color: colors.dark_txt,
        textAlign: 'center',
        margin: 10
    }
});
export default styles;