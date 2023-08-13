import {
  View,
  Text,
  Pressable,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React, { ReactNode } from "react";
import useGetMode from "../../../hooks/GetMode";

export default function Button({
  children,
  onPress,
  loading,
}: {
  children: ReactNode;
  onPress: () => void;
  loading: boolean;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const backgroundColor = isDark ? "white" : "black";
  const color = !isDark ? "white" : "black";
  const loadingColor = isDark ? "black" : "white";
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
        disabled={loading}
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
        {loading ? <ActivityIndicator color={loadingColor} /> : children}
      </Pressable>
    </View>
  );
}
