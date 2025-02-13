import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import colors from '../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    flex_up: {
        flex: 1,
        alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
        paddingTop: 10,
        width: '90%',
        alignSelf: 'center'
    },
    flex_up_btn_back: {
        width: 40,
        height: 40,
    },
    flex_up_btn_back_ic:  {
        width: 25,
        height: 25
    },

    flex_center: {
        flex: 4,
        flexDirection: 'column',
    },
    flex_center_up: {
        flex: 3
    },
    flex_center_down: {
        flex: 7,
        justifyContent: 'space-between'
    },
    flex_center_down_userName_txt: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.dark_green
    },
    flex_center_down_scroll: {
        width: '80%',
        alignSelf: 'center'
    },
    flex_center_down_scroll_txt: {
        fontSize: 12,
        width: '92%',
        alignSelf: 'center',
        textAlign: 'center',
        lineHeight: 30,
        color: colors.ligh_txt
    },

    flex_down: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default styles;