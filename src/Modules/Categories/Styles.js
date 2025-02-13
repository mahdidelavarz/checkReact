import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    list: {
        marginHorizontal: 4,
        marginTop: 10,
        height: width / 2,
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 5
    },
    list_img: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    list_empty_img: {
        width: 170,
        height: 170,
        borderRadius: 5,
    },
    list_bottom: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        zIndex: 1,
        justifyContent: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    list_bottom_title: {
        textAlignVertical: 'center',
        textAlign: 'center',
        color: colors.white,
        fontSize: 14,
    }
};;
export default styles;