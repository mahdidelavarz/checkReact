import React from 'react';
import {div, img} from 'react-native';

import {loading} from '../Images/Images';
import styles from './Styles';

function Loading() {
    return (
        <div style={styles.container}>
            <img style={styles.loading} source={loading} />
        </div>
    );
};
export default Loading;