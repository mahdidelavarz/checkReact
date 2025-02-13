import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
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
        width: '80%',
        alignSelf: 'center',
    },
    center_top_btn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    center_top_btn_ic: {
        width: 15,
        height: 15,
        position: 'absolute',
        bottom: 10
    },
};;
export default styles;