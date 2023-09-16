import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { dateAgo } from "../../../util/date";

export default function NotificationBuilder({
  imageUri,
  text,
  type,
  date,
}: {
  imageUri: string;
  text: string;
  date: string;
  type: "Follow" | "Posts" | "Reminder";
}) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View>
        <Image
          source={{ uri: imageUri }}
          style={{ height: 40, width: 40, borderRadius: 999 }}
        />
      </View>
      <View>
        <Text>{dateAgo(new Date(date))}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
}
