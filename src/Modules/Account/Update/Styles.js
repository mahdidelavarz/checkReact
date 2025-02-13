import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../../Assets/Styles/Colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        color: colors.ligh_txt,
        textAlign: 'center',
        marginVertical: 10
    },
    body: {
        fontSize: 18,
        color: colors.ligh_txt,
        textAlign: 'center',
        marginVertical: 10
    },
    btn: {
        width: '50%',
        alignSelf: 'center',
        marginTop: 20
    },
    notVersion_txt: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.ligh_txt,
        marginTop: 20
    }
};;
export default styles;