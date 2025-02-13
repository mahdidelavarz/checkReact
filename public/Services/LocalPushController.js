/* import PushNotification from "react-native-push-notification";

PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        console.log('LOCAL NOTIFICATION ==>', notification)
    },

    popInitialNotification: true,
    requestPermissions: true
});

export const LocalNotification = () => {
    PushNotification.localNotification({
        autoCancel: true,
        bigText: 'This is local notification demo in React Native app. Only shown, when expanded.',
        title: 'تخفیف های امروز دیجی کالا',
        bigPictureUrl: 'https://i.stack.imgur.com/SJisF.jpg',
        message: ' شلوار ورزشی را از دیجی کالا با تخفیف ویژه بخرید',
        vibrate: true,
        vibration: 200,
        playSound: true,
        soundName: 'default',
        // color: "transparent",
        smallIcon: "ic_launcher",
        largeIcon: "ic_launcher",
        largeIconUrl: "https://www.example.tld/picture.jpg",
    });
};

export const ScheduledLocalNotification = () => {
    PushNotification.localNotificationSchedule({
        autoCancel: true,
        bigText: 'This is local notification demo in React Native app. Only shown, when expanded.',
        subText: 'Local Notification Demo',
        title: 'Scheduled Notification Title',
        message: 'Scheduled Notification Message',
        vibrate: true,
        vibration: 500,
        playSound: true,
        soundName: 'default',
        actions: '["Yes", "No"]',
        date: new Date(Date.now() + 3 * 1000) // in 3 secs
    });
}; */