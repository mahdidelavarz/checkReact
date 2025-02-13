import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.rgba,
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        width: '80%',
        backgroundColor: colors.white,
        height: height / 2.2,
        borderRadius: 5,
        flexDirection: 'column'
    },
    header: {
        height: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: 0.6
    },
    header_circle: {
        width: 70,
        height: 70,
        backgroundColor: colors.white,
        borderRadius: 500,
        position: 'absolute',
        bottom: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_circle_img: {
        width: 60,
        height: 60,
    },

    center: {
        height: '73%',
    },
    center_view: {
        width: '90%',
        alignSelf: 'center',
    },
    center_view_txt: {
        fontSize: 14,
        color: colors.dark_txt,
        textAlign: 'left',
        width: '100%',
    },

    bottom: {
        height: '15%',
        padding: 5,
        borderTopColor: colors.ligh_txt,
        borderTopWidth: 0.6,
    },
    bottom_btn: {
        flex: 1,
        backgroundColor: colors.green,
        alignItems: 'center',
        marginRight: 10,
        width: '60%',
        alignSelf: 'center',
        borderRadius: 30,
        justifyContent: 'center',
    },
    bottom_btn_txt: {
        fontSize: 14,
        color: colors.white
    }
});
export default styles;