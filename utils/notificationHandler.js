import React from "react";
import { AsyncStorage } from "react-native";
import { Notifications } from "expo";

import  * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "flashify:notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}


export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      // if (true) {
      if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
              .then(({ status }) => {
                  if (status === "granted") {
                Notifications.cancelAllScheduledNotificationsAsync();

                const tomorrow = new Date();
                // 2 minute from now
                // tomorrow.setTime(tomorrow.getTime() + 2 * 60000);

                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: "day",
                  }
                );

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));

          }
        });
      }
    });
}

function createNotification() {
  return {
    title: "Flashify Reminder",
    body: "👋 don't forget to study for today!",
    ios: {
      sound: true,
    },
    android: {
      sounds: true,
      priority: "high",
      vibrate: true,
      sticky: false,
      color: "red",
    },
  };
}