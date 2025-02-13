import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        flex: 1,
        position: 'absolute',
        top: 0
    },
    content: {
        flex: 1,
        backgroundColor: colors.white
    },

    top: {
        height: '100%', 
    },
    top_camera: {
        flex: 1,
        alignItems: 'center',
    },

    center: {
        flex: 1,
        justifyContent: 'space-between'
    },
    center_top: {
        flex: 8,
        justifyContent: 'space-evenly',
    },
    center_top_ic: {
        width: 25,
        height: 25
    },
    center_top_title: {
        fontSize: 14,
        color: colors.dark_txt,
        textAlign: 'center',
        marginTop: 5
    },
    center_top_description_txt: {
        fontSize: 12,
        color: colors.dark_txt,
        textAlign: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    center_top_btn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    center_top_btn_ic: {
        width: 45,
        height: 45,
        tintColor: colors.violet
    },
    center_bottom: {
        flex: 2,
        justifyContent: 'center',
    },
};;
export default styles;