import { View, Text, Dimensions, Pressable } from "react-native";

import { Button } from "react-native-paper";
import { BlurView } from "expo-blur";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { useState } from "react";
import { IPerson } from "../../types/api";

import useGetMode from "../../hooks/GetMode";
import { ProfileIcon } from "../icons";
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get("screen");
export default function UserContainer({
  name,
  userName,
  id,
  imageUri,
  isFollowed,
}: IPerson) {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const backgroundColor = !dark ? "#E5E9F899" : "#25252599";
  const nbuttonBackgroundColor = !dark ? "#FFFFFF" : "#000000";
  const fbuttonBackgroundColor = dark ? "#FFFFFF" : "#000000";
  const nBColor = !dark ? "white" : "black";
  const fBColor = dark ? "white" : "black";

  return (
    <Animated.View
      entering={FadeInLeft.springify()}
      style={{
        width: "100%",
        overflow: "hidden",
        justifyContent: "space-between",
        padding: 6,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor,
        borderRadius: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {imageUri ? (
          <FastImage
            source={{ uri: imageUri }}
            style={{ height: 30, width: 30, borderRadius: 9999 }}
          />
        ) : (
          <ProfileIcon color={color} size={34} />
        )}
        <View>
          <Text style={{ fontSize: 16, fontFamily: "mulishBold", color }}>
            {name}
          </Text>
          <Text style={{ fontFamily: "jakara", fontSize: 12, color }}>
            @{userName}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderRadius: 999,
          borderWidth: 1,
          backgroundColor: "transparent",
          overflow: "hidden",
          borderColor: fbuttonBackgroundColor,
        }}
      >
        <Pressable
          android_ripple={{ color: "white" }}
          onPress={() => {}}
          style={{ paddingHorizontal: 10, paddingVertical: 6 }}
        >
          <Text
            style={{
              fontFamily: "jakara",
              color: fBColor,
              includeFontPadding: false,
            }}
          >
            {"Message"}
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
