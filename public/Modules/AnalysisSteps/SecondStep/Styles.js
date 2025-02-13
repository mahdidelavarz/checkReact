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
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    top_title: {
        fontSize: 14,
        textAlign: 'center',
        color: colors.dark_txt
    },
    top_description_txt: {
        fontSize: 12,
        width: '95%',
        textAlign: 'center',
        color: colors.ligh_txt
    },
    body: {
        flex: 4
    },
    bottom: {
        flex: 2,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    bottom_view: {
        flexDirection: 'row'
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
    },
});
export default styles;