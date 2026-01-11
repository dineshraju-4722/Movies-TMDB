import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    alert("Notification permission denied");
    return;
  }

  const token = await getToken(messaging, {
    vapidKey: "BCCWVXZsXOFBvvXr2LUfWtyACv_WZ9k7lDoDk8HigO7lZ9ViHJtWkgViP8FkzMUJxydNsh8zvAPfET5-aWJOEZo"
  });

  console.log("FCM Token:", token);
  return token;
};
