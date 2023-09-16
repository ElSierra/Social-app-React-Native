import { View, Text, FlatList, Dimensions } from "react-native";
import React from "react";
import { NotificationIcon } from "../../components/icons";
import useGetMode from "../../hooks/GetMode";
import { useGetNotificationsQuery } from "../../redux/api/user";
import NotificationBuilder from "../../components/notifications/NotificationBuilder";
import { Image } from "expo-image";
import AnimatedScreen from "../../components/global/AnimatedScreen";
export default function Notifications() {
  const dark = useGetMode();
  const { width } = Dimensions.get("screen");
  const color = dark ? "white" : "black";
  const notifications = useGetNotificationsQuery(null);
  console.log(
    "🚀 ~ file: Notifications.tsx:11 ~ Notifications ~ notifications:",
    notifications.data?.notifications
  );

  return (
    <AnimatedScreen
      style={{
      }}
    >
      {notifications.data?.notifications?.length === 0 && (
        <View
          style={{
            justifyContent: "center",
           
            alignItems: "center",
          }}
        >
          <View>
            <Image
              source={require("../../assets/images/emptyNot.png")}
              contentFit="contain"
              style={{ height: "100%", width }}
            />
            <Text style={{ fontFamily: "jakara" }}>No Notifications</Text>
          </View>
        </View>
      )}
      <FlatList
      contentContainerStyle={{paddingTop:100}}
        renderItem={({ item, index }) => (
          <NotificationBuilder
            text={item.text}
            id={item.id}
            userName={item.notifUser?.userName}
            userId={item?.notifUser?.id}
            index={index}
            imageUri={item?.notifUser?.imageUri}
            date={item.createdAt}
            type={item.type}
          />
        )}
        data={notifications?.data?.notifications}
      />
    </AnimatedScreen>
  );
}
