import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    circle: {
        width: 35,
        height: 35,
        borderRadius: 30,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle_number: {
        fontSize: 16,
        color: colors.green
    }
});
export default styles;