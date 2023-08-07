import { View, Text, useColorScheme } from "react-native";
import React from "react";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

export default function TrackerTag({ color }: { color?: string }) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const backgroundColor = !isDark ? "black" : "white";

  return (
    <Animated.View
      entering={!color ? FadeInLeft.springify() : undefined}
    
      style={{
        width: 20,
        height: 10,
        borderRadius: 999,
        backgroundColor: color || backgroundColor,
      }}
    />
  );
}
