import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_img: {
        width: width - 20,
        height: height / 1.3,
        borderRadius: 15
    },
    description: {
        width: '95%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.ligh_txt,
        marginTop: 10,
        borderRadius: 5
    }
});
export default styles;