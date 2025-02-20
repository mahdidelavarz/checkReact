import Storage from '../Factories/Storage';
import i18next from '../assets/i18n/i18n'

const storage = new Storage();

export function findStates(value, then) {
  storage.get("states.json", (states) => {
    const data = JSON.parse(states);
    data.forEach((item) => {
      if (item.code === value) {
        then(item);
      }
    });
  });
}

export function findMessages(value, then) {
  storage.get("messages.json", (messages) => {
    const data = JSON.parse(messages);
    data.forEach((item) => {
      if (item.code === value) {
        // Use i18next to determine language instead of I18nManager
        const isRTL = i18next.language === 'fa';
        then(isRTL ? item.message_fa : item.message_en);
      }
    });
  });
}

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