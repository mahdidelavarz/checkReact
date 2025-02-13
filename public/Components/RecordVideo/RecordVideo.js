import React, {useState} from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';

import styles from './Styles';

function RecordVideo() {
    return (
        <View>
            
        </View>
        // <RNCamera
        //     ref={ref => {this.camera = ref}}
        //     style={styles.preview}
        //     zoom={0.9}
        //     type={RNCamera.Constants.Type.back}
        //     flashMode={RNCamera.Constants.FlashMode.on}
        //     permissionDialogTitle={"Permission to use camera"}
        //     permissionDialogMessage={
        //         "We need your permission to use your camera phone"
        //     }
        // />
    );
};
export default RecordVideo;