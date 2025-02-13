import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    table_header: {
        height: 45,
        backgroundColor: colors.green,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '95%',
        alignSelf: 'center',
    },
    table_header_flex_txt: {
        fontSize: 12,
        flex: 1,
        color: colors.white,
        textAlign: 'center'
    },
    table_header_border: {
        height: '100%',
        width: 1,
        backgroundColor: colors.white
    }
});
export default styles;