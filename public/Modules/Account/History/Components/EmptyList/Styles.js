import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../../../../Assets/Styles/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    top_img: {
        width: width / 2,
        height: width / 2,
        marginTop: 50
    },
    bottom_title: {
        fontSize: 14,
        color: colors.ligh_txt,
        textAlign: 'center',
        marginTop: 20
    },
});
export default styles;