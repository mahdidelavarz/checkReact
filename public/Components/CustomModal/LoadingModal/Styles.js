import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../../Assets/Styles/Colors';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.rgba
    },
    modal: {
        width: '50%',
        height: width / 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.green
    },
    loading_gif: {
        width: '90%', 
        height: '90%', 
    },
});
export default styles;