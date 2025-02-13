import {
    StyleSheet,
    Dimensions
} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.rgba
    },

    content: {
        width: '80%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        paddingBottom: 5,
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        color: colors.green,
        textAlign: 'center'
    },
    body: {
        fontSize: 14,
        color: colors.ligh_txt,
        textAlign: 'center'
    }
};;
export default styles;