import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white
    },

    title: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
        color: colors.black
    },

    list: {
        width: '80%',
        height: 55,
        marginTop: 10,
        borderRadius: 5,
        flexDirection: 'row',
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: 0.6,
    },
    
    list_right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list_right_ic: {
        width: 30,
        height: 30,
        resizeMode: 'center',
    },

    list_center: {
        flex: 8,
        justifyContent: 'center',
    },
    list_center_title: {
        fontSize: 16,
        textAlign: 'left',
        marginLeft: 15,
        color: colors.black
    },

    list_left: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list_left_ic: {
        width: 25,
        height: 25,
    },

    btn_change_lang: {
        position: 'absolute',
        bottom: 10,
        width: '60%',
        height: 40
    }
};;
export default styles;