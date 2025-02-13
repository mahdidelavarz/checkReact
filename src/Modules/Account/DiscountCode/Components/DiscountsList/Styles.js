import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    empty_list: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    empty_list_message: {
        marginTop: 100, 
        color: colors.dark_txt
    }
};;
export default styles;