import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white
    },
    header: {
        flex: 2,
    },
    content: {
        flex: 8,
    },
    header_btn: {
        position: 'absolute',
        top: 17,
        right: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_btn_ic: {
        width: 25,
        height: 25
    },
};;
export default styles;