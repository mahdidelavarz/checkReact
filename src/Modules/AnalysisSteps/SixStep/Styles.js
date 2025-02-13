import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    content: {
        flex: 1,
    },

    top: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    top_img: {
        width: width / 1.9,
        height: width / 1.9,
        resizeMode: 'contain'
    },

    description: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    description_title: {
        fontSize: 16,
        color: colors.dark_txt,
        textAlign: 'center',
        marginVertical: 20,
    },
    description_txt: {
        fontSize: 12,
        color: colors.dark_txt,
        textAlign: 'center',
        width: '90%',
        alignSelf: 'center'
    },

    check: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },

    footer: {
        justifyContent: 'center',
    }
};;
export default styles;