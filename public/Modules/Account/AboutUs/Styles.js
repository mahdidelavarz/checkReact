import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    view_logo: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view_logo_img: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    collapse: {
        flex: 1
    },
});
export default styles;