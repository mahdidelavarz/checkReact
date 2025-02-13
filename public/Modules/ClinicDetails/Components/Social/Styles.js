import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    row_social: {
        flexDirection: 'row',
        width: '50%',
        height: 50,
        alignSelf: 'center'
    },
    row_social_flex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row_social_flex_circle: {
        width: 40,
        height: 40,
        borderRadius: 500,
        borderColor: colors.green,
        borderWidth: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row_social_flex_circle_ic: {
        width: 20,
        height: 20,
        tintColor: colors.green
    }
});
export default styles;