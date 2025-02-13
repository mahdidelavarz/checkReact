import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    slide: {
        flex: 1,
        flexDirection: 'column'
    },
    slide_top: {
        flex: 5,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slide_top_img: {
        width: '50%',
        height: '100%'
    },
    slide_bottom: {
        flex: 5,
        paddingTop: 15
    },
    slide_bottom_txt: {
        fontSize: 12,
        color: 'red',
        width: '95%',
        alignSelf: 'center',
        textAlign: 'center',
        color: colors.black
    },
};;
export default styles;