import React from 'react'
import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'UdaciCards:notifications'


export function clearTodaysLocalNotification(){
  let today = getNotificationDatetime(true)
  const NOTIFICATION_ID_KEY = getNotificationIdKey(today)
  AsyncStorage.getItem(NOTIFICATION_ID_KEY)
    .then(JSON.parse)
    .then(notificationId => clearLocalNotification(notificationId))
}

function createNotification () {
  return {
    title: 'Practice quiz!',
    body: "👋 don't forget to practice today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

function getNotificationDatetime(today) {
  let d = new Date();
  if(!today) {
    d.setDate(d.getDate()+1);
  }
  d.setHours(20);
  d.setMinutes(0);
  return d;
}

function getNotificationIdKey(date) {
  let key = 'UdaciCards:notifications-';
  key += date.getDate()
  key += '-'
  key += date.getMonth()
  key += '-'
  key += date.getFullYear()
  key += '-'
  key += date.getHours()
  key += '-'
  key += date.getMinutes()
  return key
}

export function clearLocalNotification (notificationId) {
  if(!notificationId){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  } else {
    console.log("Clearing Notification id=" + notificationId)
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelScheduledNotificationAsync(notificationId))
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = getNotificationDatetime()
              const NOTIFICATION_ID_KEY = getNotificationIdKey(tomorrow)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              ).then((notificationId) => {
                // console.log("Setting key=" + NOTIFICATION_ID_KEY + ", Notification id=" + notificationId)
                AsyncStorage.setItem(NOTIFICATION_ID_KEY, JSON.stringify(notificationId))
              })

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}