import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({

  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default Notifications