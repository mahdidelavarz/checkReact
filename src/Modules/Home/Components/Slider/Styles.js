import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../Assets/Styles/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = const styles = {
    container: {
        flex: 1,
        alignItems: 'center'
    },
    slide_btn: {
        borderRadius: 15,
    },
    slide_btn_img: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    slide_border: {
        borderRadius: 15
    },
    slide_pagination: {
        position: 'absolute',
        bottom: -25,
        right: 5
    },
    slide_pagination_dot: {
        width: 17,
        height: 7,
        borderRadius: 5
    }
};;
export default styles;