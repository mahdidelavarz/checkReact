import React, { Component } from 'react'
import { div, TextInput, img, button } from 'react-native';

import { ic_eye, ic_off_eye } from '../Images/Images';
import colors from '../../Assets/Styles/Colors';
import styles from './Styles';

class CustomInput extends Component {
    constructor(props) {
        super(props);
        if (this.props.onRef != null) {
            this.props.onRef(this)
        }
        this.state = {
            isVisiblePassword: false
        }
    }

    onSubmitEditing() {
        this.props.onSubmitEditing();
    }

    onPressIsVisiblePassword = () => {
        this.setState({ isVisiblePassword: !this.state.isVisiblePassword });
    }

    focus() {
        this.textInput.focus()
    }

    render() {
        const { style, placeholder, event, keyboardType, mode, autoCapitalize } = this.props;
        const { isVisiblePassword } = this.state;
        return (
            <div>
                {mode === 'password' ?
                    <button style={styles.btn_visible} onPress={this.onPressIsVisiblePassword}>
                        <img style={styles.btn_visible_ic} source={!isVisiblePassword ? ic_eye : ic_off_eye} />
                    </button>
                    :
                    null
                }
                <TextInput
                    style={[styles.input, style]}
                    placeholder={placeholder}
                    ref={input => this.textInput = input}
                    onSubmitEditing={this.onSubmitEditing.bind(this)}
                    placeholderTextColor={colors.ligh_txt}
                    onChangeText={event}
                    autoCapitalize={autoCapitalize}
                    secureTextEntry={mode === 'password' ? !isVisiblePassword : false}
                    keyboardType={keyboardType}
                />
            </div>
        );
    }
};
export default CustomInput;