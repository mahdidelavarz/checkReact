import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    content: {
        flexDirection: 'column',
        height: height / 2
    },

    loading_view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading_view_img: {
        height: width / 3, 
        height: width / 3,
        resizeMode: 'contain',
    },

    txt_view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    txt_view_ic_ok: {
        width: 20,
        height: 20,
    },
    txt_view_title: {
        fontSize: 16,
        color: colors.dark_txt,
    },
    txt_view_time: {
        fontSize: 14,
        color: colors.ligh_txt,
        width: '75%',
        alignSelf: 'center',
        textAlign: 'center'
    },
});
export default styles;