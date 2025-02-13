import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    camera: {
        width : '100%', 
        height:'100%'
    },

    marker: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    marker_view: {
        height: 150,
        width: width / 1.3,
        borderWidth: 0.5,
        borderColor: colors.green,
        backgroundColor: 'transparent',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    marker_view__animate: {
        marginTop: width / 4,
    },
    marker_view__animate_line: {
        backgroundColor: colors.violet,
        width: width / 1.4,
        height: 0.6
    },
});
export default styles;