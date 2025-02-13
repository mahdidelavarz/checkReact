import React from 'react';
import { div, img, TextInput, button } from 'react-native';

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
            <div style={styles.row}>
                <div style={styles.row_right}>
                    <img style={styles.row_right_ic} source={img} />
                </div>
                <div style={styles.row_center}>
                    <CustomText style={styles.row_center_txt}>
                        {label}
                    </CustomText>
                </div>
                <div style={styles.row_left}>
                    {mode === 'date' ?
                        <button style={styles.row_left_btn} onPress={func}>
                            <CustomText style={styles.row_left_btn_txt}>
                                {date}
                            </CustomText>
                        </button>
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
                </div>
            </div>
        );
    }
};
export default Row;