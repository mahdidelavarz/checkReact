import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../Assets/Styles/Colors';

const styles = StyleSheet.create({
    tabbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        height: 60,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.ligh_txt,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    activeItem: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    active: {
        tintColor: colors.green,
    },
    inactive: {
        tintColor: colors.ligh_txt,
    },
    icon: {
        height: 30,
        width: 30,
    },
    label: {
        fontSize: 11,
        marginTop: 5,
    },
    inactiveLabel: {
        color: colors.ligh_txt
    },
    activeLabel: {
        color: colors.green
    },
});
export default styles;