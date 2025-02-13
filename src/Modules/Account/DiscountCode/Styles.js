import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
    },
    input: {
        width: '60%', 
        alignSelf: 'center', 
        height: 45, 
        textAlign: 'center',
        fontSize: 14
    },
    btn: {
        width: '60%', 
        alignSelf: 'center', 
        height: 35, 
        textAlign: 'center', 
        marginTop: 15
    },

    content: {
        flex: 1,
    },
    list_header: {
        width: width,
        height: 40,
        backgroundColor: colors.light_gray,
        marginTop: 30,
        justifyContent: 'center',
    },
    list_header_title: {
        fontSize: 14,
        color: colors.dark_txt,
        textAlign: 'center'
    }
};;
export default styles;