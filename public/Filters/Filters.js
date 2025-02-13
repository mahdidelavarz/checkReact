import { I18nManager } from 'react-native';
import Storage from '../Factories/Storage';

let storage = new Storage();

export function findStates(value, then) {
    storage.get("states.json", states => {
        const data = JSON.parse(states);
        data.forEach(item => {
            if (item.code === value) {
                then(item);
            }
        });
    })
};

export function findMessages(value, then) {
    storage.get("messages.json", messages => {
        const data = JSON.parse(messages);
        data.forEach(item => {
            if (item.code === value) {
                if (I18nManager.isRTL) {
                    then(item.message_fa);
                    // return (item.message_en)
                } else {
                    then(item.message_en);
                    // return (item.message_fa)
                }
            }
        });
    });
};

// class Filters {
//     Currency = function (price) {
//         return (price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     };

//     Find = function (array, key, value, then) {
//         array.map((item, index) => {
//             if (item[key] === value) {
//                 then(item, index)
//             }
//         });
//     };

//     // Find = function (array, key, value, then) {
//     //     array.map((item, index) => {
//     //         if (item[key] === value) {
//     //             then(item, index);
//     //         }
//     //     });
//     // };
// }
// export default Filters;