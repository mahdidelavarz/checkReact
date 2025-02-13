import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
    },

    list: {
        width: '95%',
        height: 150,
        backgroundColor: colors.white,
        borderWidth: 0.7,
        borderColor: colors.ligh_txt,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'column',
        alignSelf: 'center'
    },

    list_top: {
        flex: 3,
        justifyContent: 'center',
    },
    list_top_title: {
        fontSize: 16,
        color: colors.dark_txt,
        textAlign: 'center'
    },

    list_body: {
        flex: 3.5,
        flexDirection: 'row',
    },
    list_body_right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list_body_right_ic: {
        width: 20,
        height: 20,
        tintColor: colors.green
    },
    list_body_left: {
        flex: 9,
        justifyContent: 'center',
    },
    list_body_left_txt: {
        fontSize: 14,
        width: '98%',
        color: colors.dark_txt,
        textAlign: 'left'
    },

    list_bottom: {
        flex: 3.5,
        flexDirection: 'row'
    },
    list_bottom_right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list_bottom_center: {
        flex: 4,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    list_bottom_left: {
        flex: 4.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list_bottom_left_btn: {
        width: '80%',
        height: '70%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green

    },
    list_bottom_left_btn_txt: {
        fontSize: 14,
        width: '98%',
        color: colors.white,
        textAlign: 'center'
    },
    list_bottom_left_btn_ic: {
        width: 10,
        height: 10,
        marginTop: 5,
        tintColor: colors.white,
    },
    empty_list_message: {
        fontSize: 14,
        color: colors.black,
        textAlign: 'center',
        marginTop: height / 2.5
    }
};;
export default styles;