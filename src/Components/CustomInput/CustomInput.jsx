import React, { Component } from 'react';
import { TextInput, Image, TouchableOpacity } from 'react-native';

import { ic_eye, ic_off_eye } from '../Images/Images';
import { colors } from '../../Assets/Styles/Colors';

class CustomInput extends Component {
    constructor(props) {
        super(props);
        if (this.props.onRef != null) {
            this.props.onRef(this);
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
            <div className="relative">
                {mode === 'password' && (
                    <TouchableOpacity 
                        style="absolute right-1 bottom-0 z-10"
                        onPress={this.onPressIsVisiblePassword}
                    >
                        <Image 
                            style="w-5 h-5" 
                            source={!isVisiblePassword ? ic_eye : ic_off_eye} 
                        />
                    </TouchableOpacity>
                )}
                <TextInput
                    style={`w-full h-8 rounded-full text-sm text-left p-2 bg-white border border-light-txt mt-2 ${style}`}
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
}

export default CustomInput;
