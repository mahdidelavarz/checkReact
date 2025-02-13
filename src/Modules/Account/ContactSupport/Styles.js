import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    top: {
        flex: 1,
    },
    top_btn_ic: {
        width: 25,
        height: 25,
        marginTop: 15,
        marginLeft: 10
    },

    center: {
        flex: 6,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'
    },
    center_txt: {
        width: '50%',
        alignSelf: 'center',
        textAlign: 'center'
    },

    bottom: {
        flex: 3,
        justifyContent: 'center'
    },
    bottom_btn: {
        width: '50%', 
        alignSelf: 'center', 
        marginTop: 5,
    }
};;
export default styles;