import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    table: {
        height: 45,
        backgroundColor: colors.white,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        alignSelf: 'center',
        borderColor: colors.ligh_txt,
        borderWidth: 1
    },
    table_header_flex_txt: {
        fontSize: 12,  
        flex: 1,
        color: colors.black,
        textAlign: 'center'
    },
    table_border: {
        height: '100%', 
        width: 1, 
        backgroundColor: colors.ligh_txt
    },
    view_4: {
        flex: 1, 
        borderRightColor: colors.ligh_txt, 
        borderRightWidth: 1, 
        height: '100%', 
        justifyContent: 'center',
    }
});
export default styles;