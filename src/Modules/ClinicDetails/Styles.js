import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../Assets/Styles/Colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
    },
    view_top: {
        width: width,
        height: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view_top_img: {
        width: width / 1.8,
        height: width / 1.8,
        resizeMode: 'contain'
    },
    view_top_empty_img: {
        width: 140,
        height: 140,
        alignSelf: 'center'
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
    },
    view_bg: {
        width: '95%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#fff',
        // borderColor: colors.ligh_txt,
        // borderWidth: 0.7,
        elevation: 4
    },
};;
export default styles;