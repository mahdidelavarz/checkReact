import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    btn_submit: {
        width: '60%',
        height: 40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 5
    }
});
export default styles;