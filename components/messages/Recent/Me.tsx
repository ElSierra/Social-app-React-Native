import { View, Text, Pressable } from "react-native";
import React from "react";

import useGetMode from "../../../hooks/GetMode";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import { ActivityIndicator } from "react-native-paper";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { Image } from "expo-image";

export default function Me() {
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";
  const user = useAppSelector((state) => state.user.data);
  return (
    <>
      <Pressable>
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
            source={{ uri: user?.imageUri }}
          />
          <Text
            numberOfLines={1}
            style={{ fontFamily: "jakara", fontSize: 16, color }}
          >
            Me
          </Text>
        </Animated.View>
      </Pressable>
    </>
  );
}
