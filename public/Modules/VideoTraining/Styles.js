import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },  
    indicator: {
        backgroundColor: colors.green,
        height: 2
    },
    tabbar: {
        backgroundColor: colors.white,
    },
    label: {
        color: colors.green,
        fontSize: 12,
        fontFamily: 'iranyekanwebbold(fanum)'
    },
    player: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
});
export default styles;