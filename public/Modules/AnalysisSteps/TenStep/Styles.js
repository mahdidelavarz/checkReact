import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;
//TwelveStep

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        flex: 1,
        position: 'absolute',
        top: 0
    },
    content: {
        flex: 1,
        backgroundColor: colors.white
    },

    top: {
        height: '100%', 
    },
    top_camera: {
        flex: 1,
        alignItems: 'center',
    },

    center: {
        flex: 1,
        justifyContent: 'space-between'
    },
    center_top: {
        flex: 8,
        justifyContent: 'space-evenly',
    },
    center_top_ic: {
        width: 15,
        height: 15
    },
    center_top_title: {
        fontSize: 14,
        color: colors.dark_txt,
        textAlign: 'center',
        marginTop: 5
    },
    center_top_description_txt: {
        fontSize: 12,
        color: colors.dark_txt,
        textAlign: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    center_top_btn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    center_top_btn_ic: {
        width: 40,
        height: 40,
    },
    center_bottom: {
        flex: 2,
        justifyContent: 'center',
    },
});
export default styles;