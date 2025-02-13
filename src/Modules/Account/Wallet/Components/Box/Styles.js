import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    box: {
        width: '46%',
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 15,
        marginHorizontal: '2%'
    },
    box_img: {
        width: 20,
        height: 20
    },
    box_price_txt: {
        fontSize: 16
    },
    btn_submit: {
        width: '70%',
        alignSelf: 'center',
        height: 40
    }
};;
export default styles;