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
        height: 200, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15,
    },
    top_img: {
        width: width / 2.5,
        height: width / 2.5,
        resizeMode: 'contain'
    },

    description: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    description_title: {
        fontSize: 16,
        color: colors.dark_txt,
        textAlign: 'center',
        marginTop: 15,
    },
    description_txt: {
        fontSize: 12,
        color: colors.dark_txt,
        textAlign: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
    },

    check: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },

    footer: {
        justifyContent: 'center',
    }
});
export default styles;