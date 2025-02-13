import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../../../Assets/Styles/Colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    map: {
        width: '100%',
        justifyContent: 'space-between'
    },
    map_approximate: {
        fontSize: 8,
        color: colors.white,
        position: 'absolute',
        top: 1,
        left: 1,
        zIndex: 1,
        backgroundColor: colors.green,
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: colors.black
    },
    top_map: {
        width: '100%',
        height: 150
    },
    top_map_img: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },

    bottom_map: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom_map_btn: {
        backgroundColor: colors.green,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 45,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottom_map_btn_ic: {
        width: 35,
        height: 35,
        tintColor: colors.white,
        marginTop: 5,
        marginRight: 5
    },
    bottom_map_btn_txt: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center'
    }
});
export default styles;