import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import styles from './Styles';

function Keyboard(props) {
    const [numbers] = useState([
        {number: 1, id: 1},
        {number: 2, id: 2},
        {number: 3, id: 3},
        {number: 4, id: 4},
        {number: 5, id: 5},
        {number: 6, id: 6},
        {number: 7, id: 7},
        {number: 8, id: 8},
        {number: 9, id: 9},
        {number: '*', id: 10},
        {number: 0, id: 11}
    ]);
    const [active, setActive] = useState(false);

    const {func} = props;
    return (
        <View style={styles.keyboard_row}>
            {
                numbers.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.keyboard_row_view}
                        activeOpacity={0.5}
                        onPress={() => {func(item); setActive(true)}}
                    >
                        {item.id == 10 && active == false ? null :
                            <Text style={item.id == 10 ? styles.keyboard_row_view_number_clear : styles.keyboard_row_view_number}>
                                {item.number}
                            </Text>
                        }
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};
export default Keyboard;