import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    content: {
        flex: 1,
        flexDirection: 'column'
    },

    top: {
        flex: 4.5, 
        justifyContent: 'space-around',
    },
    top_title: {
        fontSize: 14,
        color: colors.dark_txt,
        textAlign: 'center',
        marginVertical: 30,
    },
    top_description_txt: {
        fontSize: 12,
        color: colors.dark_txt,
        textAlign: 'center',
        width: '90%',
        alignSelf: 'center'
    },

    center: {
        flex: 4.5, 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },

    footer: {
        justifyContent: 'center',
    }
});
export default styles;