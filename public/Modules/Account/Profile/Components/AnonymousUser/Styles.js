import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingBottom: 30,
        paddingTop: 30
    },
    title: {
        fontSize: 18,
        color: colors.dark_txt,
        textAlign: 'center'
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

    // content: {
    //     backgroundColor: colors.white,
    //     flex: 9,
    //     width: '90%',
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     borderColor: colors.ligh_txt,
    //     flexDirection: 'column'
    // },
    content_top: {
        flex: 2.2,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content_top_img: {
        width: 70,
        height: 70
    },
    content_top_txt: {
        fontSize: 16
    },

    content_center: {
        flex: 6.5,
        padding: 10,
    },
    content_center_txt: {
        fontSize: 11,
        lineHeight: 25,
        textAlign: 'center',
        color: colors.ligh_txt,
    },

    content_bottom: {
        flex: 1.3,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content_bottom_check_btn: {
        flexDirection: 'row'
    },
    content_bottom_check_btn_ic: {
        width: 20,
        height: 20,
    },
    content_bottom_check_btn_txt: {
        fontSize: 10,
        color: colors.ligh_txt,
        marginStart: 5,
    },
    content_bottom_btn: {
        width: '80%',
        height: 35,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green
    },
    content_bottom_btn_txt: {
        fontSize: 14, color: colors.white
    }
});
export default styles;