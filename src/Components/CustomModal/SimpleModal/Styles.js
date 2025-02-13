import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../../Assets/Styles/Colors';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.rgba
    },
    modal: {
        width: '80%',
        height: width / 2,
        borderRadius: 5,
        backgroundColor: colors.white,
        flexDirection: 'column',
    },

    modal_top: {
        flex: 2,
        justifyContent: 'space-evenly'
    },
    modal_top_ic: {
        width: 25,
        height: 25,
        alignSelf: 'center',
        tintColor: colors.green
    },
    modal_top_title: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.dark_txt
    },
    modal_top_description: {
        fontSize: 12,
        width: '90%',
        alignSelf: 'center',
        textAlign: 'center',
        color: colors.ligh_txt
    },

    modal_bottom: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    modal_bottom_btn: {
        width: '50%',
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 5,
        backgroundColor: colors.green
    },
    modal_bottom_btn_right: {
        flex: 1,
        width: '50%',
        height: 40,
        marginLeft: 5,
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: colors.green
    },
    modal_bottom_btn_left: {
        flex: 1,
        width: '50%',
        height: 40,
        margin: 5,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.dark_green,
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    modal_bottom_btn_txt: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.white
    },
};;
export default styles;