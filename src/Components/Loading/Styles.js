import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import colors from '../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    loading: {
        width: width / 3,
        height: width / 3
    }
};;
export default styles;