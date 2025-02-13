import React from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import language from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

class Row extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.onRef != null) {
            this.props.onRef(this)
        }
    }

    onSubmitEditing() {
        this.props.onSubmitEditing();
    }

    focus() {
        this.textInput.focus()
    }

    render() {
        const { img, label, event, keyboardType, defaultValue, mode, func, date } = this.props;
        return (
            <View style={styles.row}>
                <View style={styles.row_right}>
                    <Image style={styles.row_right_ic} source={img} />
                </View>
                <View style={styles.row_center}>
                    <CustomText style={styles.row_center_txt}>
                        {label}
                    </CustomText>
                </View>
                <View style={styles.row_left}>
                    {mode === 'date' ?
                        <TouchableOpacity style={styles.row_left_btn} onPress={func}>
                            <CustomText style={styles.row_left_btn_txt}>
                                {date}
                            </CustomText>
                        </TouchableOpacity>
                        :
                        <TextInput
                            style={styles.row_left_input}
                            onChangeText={event}
                            keyboardType={keyboardType}
                            ref={input => this.textInput = input}
                            defaultValue={defaultValue}
                            onSubmitEditing={this.onSubmitEditing.bind(this)}
                        />
                    }
                </View>
            </View>
        );
    }
};
export default Row;