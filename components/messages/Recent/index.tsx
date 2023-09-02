import { View, Text, Animated } from "react-native";
import React from "react";
import AvatarName from "./AvatarName";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useGetMode from "../../../hooks/GetMode";

export default function Recent({ offset }: { offset: Animated.Value }) {
  const HEADER_HEIGHT = 300;
  const Header_Min_Height = 70;
  const insets = useSafeAreaInsets();

  const headerHeight = offset.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT / 2, 0],
    extrapolate: "clamp",
  });
  const opacity = offset.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";

  return (
    <Animated.View
      style={{
        height: headerHeight,
        opacity,
      }}
    >
      <View style={{ paddingHorizontal: 14, paddingTop: 0, paddingBottom: 0 }}>
        <Text style={{ fontFamily: "jakara", letterSpacing: 4, color }}>
          RECENT
        </Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingLeft: 20 }}
        renderItem={({ item }) => <AvatarName />}
        data={[0, 1, 2, 3, 4, 5, 6]}
      />
    </Animated.View>
  );
}
