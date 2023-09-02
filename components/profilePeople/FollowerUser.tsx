import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import useGetMode from "../../hooks/GetMode";
import { getBackgroundColorAsync } from "expo-system-ui";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { useLazyFollowUserQuery } from "../../redux/api/services";
import { useAppSelector } from "../../redux/hooks/hooks";

export default function FollowUser({
  id,
  followed,
  handleFollow,
}: {
  id: string;
  followed: boolean;
  handleFollow: () => void;
}) {
  const dark = useGetMode();
  const color = !dark ? "white" : "black";
  const color2 = dark ? "white" : "black";



  return (
    <Animated.View
      entering={BounceIn.duration(100)}
      style={{ height: 60 }}
      exiting={BounceOut.duration(100)}
      key={followed ? "i" : "j"}
    >
      <Pressable
        onPress={handleFollow}
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: followed ? color : color2,
          borderColor: "#B4B4B4D1",
          borderRadius: 999,
          borderWidth: !followed ? 0 : 1,
        }}
      >
        <Text
          style={{
            fontFamily: "jakaraBold",
            color: followed ? color2 : color,
          }}
        >
          {followed ? "Following" : "Follow"}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
