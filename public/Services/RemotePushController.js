/* import React, { useEffect } from "react";
import PushNotification from "react-native-push-notification";

const RemotePushController = () => {

    useEffect(() => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token)
            },
            onNotification: function (notification) {
                console.log("REMOTE NOTIFICATION ==>", notification)
                PushNotification.localNotification({
                    title: `${notification.title}`,
                    message: `${notification.message}`,
                    vibrate: true,
                    autoCancel: true,
                    vibration: 300,
                    playSound: true,
                    soundName: "default",
                    largeIcon: "ic_launcher",
                    smallIcon: "ic_launcher"
                });
            },
            senderID: "789232914470",
            popInitialNotification: true,
            requestPermissions: true
        })
    }, [])

    return null;
};
export default RemotePushController; */