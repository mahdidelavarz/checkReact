import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'column'
    },
    top: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    top_img: {
        width: '60%',
        height: '60%'
    },
    top_ic: {
        width: 25, 
        height: 25, 
        tintColor: 'red',
        position: 'absolute'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    bottom_txt: {
        fontSize: 12,
        color: colors.ligh_txt,
        textAlign: 'center'
    },
});
export default styles;