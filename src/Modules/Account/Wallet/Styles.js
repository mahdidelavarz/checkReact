import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,
        flexDirection: 'column'
    },

    top: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    top_input: {
        width: '60%',
        height: 40,
        fontFamily: 'iranyekanwebbold(fanum)',
        fontSize: 12,
        borderWidth: 1,
        borderColor: colors.green,
        borderRadius: 30,
        padding: 10,
        textAlign: 'center'
    },
    top_txt: {
        fontSize: 14,
        color: colors.dark_txt
    },
    
    bottom: {
        flex: 5,
        justifyContent: 'space-around'
    },

    flatList: {
        width: '100%', 
        alignSelf: 'center',
    },
    box: {
        width: '46%',
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 15,
        marginHorizontal: '2%'
    },
    box_img: {
        width: 20,
        height: 20
    },
    box_price_txt: {
        fontSize: 16
    },
    btn_submit: {
        width: '70%',
        alignSelf: 'center',
        height: 40
    }
};;
export default styles;