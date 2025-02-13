import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    collapse: {
        width: '95%',
        alignSelf: 'center',
        marginVertical: 5
    },
    collapse_top: {
        flexDirection: 'row',
        height: 45,
        backgroundColor: colors.green,
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3
    },

    collapse_top_right: {
        flex: 9,
        justifyContent: 'center',
    },
    collapse_top_right_title: {
        fontSize: 14,
        color: colors.white,
        textAlign: 'left',
        marginStart: 5
    },

    collapse_top_left: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    collapse_top_left_ic: {
        width: 15,
        height: 15,
        tintColor: colors.white
    },

    body: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: colors.green,
        justifyContent: 'center',
    },
    body_txt: {
        fontSize: 12,
        color: colors.black,
        textAlign: 'center',
        width: '97%',
        alignSelf: 'center',
        lineHeight: 30,
        fontFamily: 'iranyekanwebregular(fanum)'
    }
});
export default styles;