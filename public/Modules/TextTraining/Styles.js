import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        flex: 1,
    },
    slide_active_dot: {
        backgroundColor: colors.green,
        width: 17
    },
    right_btn: {
        width: 40,
        height: 40,
        backgroundColor: colors.green,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    right_btn_ic: {
        width: 15,
        height: 15,
        tintColor: colors.white
    }
});
export default styles;