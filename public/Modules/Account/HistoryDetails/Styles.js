import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    top_img: {
        width: '80%',
        height: '80%',
    },
    description: {
        width: '95%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.ligh_txt,
        marginTop: 10,
        borderRadius: 5
    },
    description_top: {
        height: 35,
        backgroundColor: colors.green,
        justifyContent: 'center',
    },
    description_top_txt: {
        color: colors.white,
        textAlign: 'center'
    },
    description_txt: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 12,
        width: '90%',
        marginVertical: 10,
    },
    description_btn: {
        width: '60%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    description_btn_txt: {
        fontSize: 12,
    },

    view_table: {
        marginVertical: 5
    },
    view_table_title: {
        fontSize: 16,
        color: colors.black,
        textAlign: 'center',
        marginVertical: 5
    },
    view_result: {
        width: '95%',
        alignSelf: 'center'
    },
    view_result_img: {
        width: '100%',
        height: 200,
        borderRadius: 5
    },
    view_result_btn: {
        width: '60%',
        height: 35,
        backgroundColor: colors.green,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10
    },
    view_result_btn_txt: {
        color: colors.white
    }
});
export default styles;