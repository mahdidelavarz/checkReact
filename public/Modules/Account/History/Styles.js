import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    view_active_analysis: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.violet,
        borderRadius: 5,
        height: 60,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    view_active_analysis_txt: {
        fontSize: 12,
        color: colors.dark_txt,
        textAlign:  'center'
    },
    view_active_analysis_img: {
        width: 30,
        height: 30
    },

    emtyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description_txt: {
        fontSize: 14,
        width: '90%',
        color: colors.ligh_txt,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    view_btn: {
        width: '60%',
        alignSelf: 'center',
    },
    btn: {
        height: 40,
        backgroundColor: colors.white,
        borderColor: colors.dark_green,
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 15
    },
    top_title: {
        fontSize: 16,
        color: colors.white,
        position: 'absolute',
        bottom: 20,
       
        alignSelf: 'center'
    },

    tabbar: {
        backgroundColor: colors.green,
    },
    indicator: {
        backgroundColor: colors.dark_green,
        height: 1
    },
    label: {
        color: colors.white,
        fontSize: 12,
        fontFamily: 'iranyekanwebbold(fanum)'
    }
});
export default styles;