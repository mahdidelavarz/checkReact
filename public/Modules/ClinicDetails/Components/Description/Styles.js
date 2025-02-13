import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    view_description: {
        width: '88%',
        alignSelf: 'center',
        paddingBottom: 5
    },
    view_description_txt: {
        fontSize: 12,
        color: colors.gray,
        textAlign: 'center',
    },
});
export default styles;