import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    view_message: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.white
    },
});
export default styles;