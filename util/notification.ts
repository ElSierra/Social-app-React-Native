import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});
export async function registerForPushNotificationsAsync() {
  try {
    let token;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: "e618bb47-6149-4585-8cc8-884c5992795e",
    });
    console.log(token);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#8FFF1FC0",
      });
      Notifications.setNotificationCategoryAsync("message", [
        {
          identifier: "message",
          buttonTitle: "Reply",
          textInput: { submitButtonTitle: "reply", placeholder: "Enter Reply", },
          
          
        },
      ]);
    }

    return token;
  } catch (e) {}
}

export default Notifications;
