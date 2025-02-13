import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    preview: {
        flex:1
    },
    btn_visible: {
        position: 'absolute',
        right: 5,
        bottom: 2,
        zIndex: 1,
        width: 25,
        height: 25
    },
    btn_visible_ic: {
        width: 20,
        height: 20,
        tintColor: colors.ligh_txt
    }
};;
export default styles;