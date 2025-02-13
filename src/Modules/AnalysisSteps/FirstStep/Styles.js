import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,
    },

    content_top: {
        height: 100,
        justifyContent: 'center',
    },
    content_top_txt: {
        fontSize: 14,
        color: colors.dark_txt,
        textAlign: 'center',
        width: '95%',
        alignSelf: 'center'
    },

    content_body: {
        height: 450,
        alignItems: 'center',
        marginBottom: 250
    },
    content_body_row: {
        flexDirection: 'row',
        width: '90%',
        height: '22%',
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: colors.light_gray,
        borderColor: colors.ligh_txt,
        borderWidth: 0.6
    },
    content_body_row_right: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_body_row_right_img: {
        width: 50,
        height: 50,
        resizeMode: 'center',
        // tintColor: colors.green
    },
    content_body_row_left: {
        flex: 3.5,
        justifyContent: 'center',
    },
    content_body_row_left_txt: {
        fontSize: 14,
        color: colors.dark_txt,
    },

    content_center: {
        height: 150,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },

    content_bottom: {
        justifyContent: 'center',
    },
};;
export default styles;