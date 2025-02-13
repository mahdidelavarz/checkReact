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
        flex: 2, 
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    top_circle: {
        width: width / 4,
        height: width / 4,
        borderRadius: 500,
        borderWidth: 3,
        borderColor: colors.ligh_txt,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    top_circle_timer: {
        fontSize: 16,
        color: colors.dark_txt,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    description: {
        flex: 4.5, 
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    description_title: {
        fontSize: 16,
        color: colors.dark_txt,
        textAlign: 'center',
    },
    description_txt: {
        fontSize: 12,
        color: colors.dark_txt,
        textAlign: 'center',
        width: '90%',
        alignSelf: 'center'
    },

    check: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    footer: {
        flex: 1, 
        justifyContent: 'center',
    }
});
export default styles;