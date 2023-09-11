import { View, Text } from "react-native";
import React from "react";
import { NotificationIcon } from "../../components/icons";
import useGetMode from "../../hooks/GetMode";

export default function Notifications() {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <NotificationIcon size={40} color={color} />
        <Text style={{ fontFamily: "jakaraBold", color }}>
          No New Notifications
        </Text>
      </View>
    </View>
  );
}
