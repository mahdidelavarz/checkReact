import React from 'react';
import {View, Image} from 'react-native';

import {loading} from '../Images/Images';
import styles from './Styles';

function Loading() {
    return (
        <View style={styles.container}>
            <Image style={styles.loading} source={loading} />
        </View>
    );
};
export default Loading;