import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useCallback } from "react";
import { NotificationIcon } from "../../components/icons";
import useGetMode from "../../hooks/GetMode";
import { useGetNotificationsQuery } from "../../redux/api/user";
import NotificationBuilder from "../../components/notifications/NotificationBuilder";
import { Image } from "expo-image";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { Notifications as NotificationType } from "../../types/api";
export default function Notifications() {
  const dark = useGetMode();
  const { width } = Dimensions.get("window");
  const color = dark ? "white" : "black";
  const notifications = useGetNotificationsQuery(null);
  console.log(
    "🚀 ~ file: Notifications.tsx:16 ~ Notifications ~ notifications:",
    notifications.data
  );

  useFocusEffect(
    useCallback(() => {
      notifications.refetch();
    }, [])
  );
  const renderItem = ({
    item,
    index,
  }: {
    item: NotificationType;
    index: any;
  }) => (
    <NotificationBuilder
      text={item.text}
      postId={item?.to}
      id={item.id}
      position={
        item.id === notifications.data?.notifications[0].id
          ? "first"
          : item.id ===
            notifications.data?.notifications[
              notifications.data?.notifications?.length - 1
            ].id
          ? "last"
          : "middle"
      }
      userName={item.notifUser?.userName}
      userId={item?.notifUser?.id}
      index={index}
      imageUri={item?.notifUser?.imageUri}
      date={item.createdAt}
      type={item.type}
    />
  );
  return (
    <AnimatedScreen style={{ marginTop: 120 }}>
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
        ListEmptyComponent={
          notifications.isLoading ? (
            <ActivityIndicator size={20} color={color} />
          ) : undefined
        }
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
        }}
        renderItem={renderItem}
        data={notifications?.data?.notifications}
      />
    </AnimatedScreen>
  );
}
