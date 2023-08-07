import { View, Text, Pressable, useColorScheme } from "react-native";
import React, { ReactNode } from "react";

export default function Button({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress: () => void;
}) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const backgroundColor = isDark ? "white" : "black";
  const color = !isDark ? "white" : "black";
  return (
    <View
      style={{
        height: 50,
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor,
      }}
    >
      <Pressable
        android_ripple={{ color }}
        onPress={onPress}
        style={{
          height: 50,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          
        }}
      >
        {children}
      </Pressable>
    </View>
  );
}
