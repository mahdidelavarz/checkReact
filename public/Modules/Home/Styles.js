import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
    },

    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    header_img: {
        width: 200,
        height: 50,
        resizeMode: 'center',
        //color: colors.green,
    },

    center: {
        flex: 7.5,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'column',
        // backgroundColor: 'red'
    },
    center_row: {
        flexDirection: 'row',
        width: '95%',
        // backgroundColor: 'red',
        flex: 1
    },

    bottom: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5
    },
});
export default styles;