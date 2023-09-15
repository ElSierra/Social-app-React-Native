import { View, Text, Pressable } from "react-native";
import React from "react";

import useGetMode from "../../../hooks/GetMode";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import { ActivityIndicator } from "react-native-paper";
import { Image } from "expo-image";

export default function AvatarName({
  userName,
  imageUri,
  id,
  receiverId,
}: {
  userName: string;
  imageUri: string;
  id: string;
  receiverId: string;
}) {
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <>
   
      <Pressable
        onPress={() =>
          navigation.navigate("ChatScreen", {
            id: id,
            receiverId,
            name: userName,
            imageUri,
          })
        }
      >
        <Animated.View
          entering={FadeInLeft.springify()}
          exiting={FadeOutLeft.springify()}
          style={{
            justifyContent: "center",
            width: 100,
            alignItems: "center",
          }}
        >
          <Image
            style={{ borderRadius: 9999, height: 65, width: 65 }}
            source={{ uri: imageUri }}
          />
          <Text
            numberOfLines={1}
            style={{ fontFamily: "jakara", fontSize: 16, color }}
          >
            @{userName}
          </Text>
        </Animated.View>
      </Pressable>
    </>
  );
}
