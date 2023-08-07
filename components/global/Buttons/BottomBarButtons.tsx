import { View, Text, Pressable, useColorScheme } from "react-native";
import React, { ElementType } from "react";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp, RootStackParamList } from "../../../types/navigation";
import useGetMode from "../../../hooks/GetMode";

export default function IconButtons({
  Icon,
  onPress,
}: {
  Icon: ElementType;
  onPress: () => void;
}) {
  const navigate = useNavigation<HomeNavigationProp>();
  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "white" : "black";
  return (
    <View
      style={{
        width: 80,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:10,
        overflow:"hidden",
      }}
    >
      <Pressable
        android_ripple={{
          color: "#0000004B",
          borderless: false,
          foreground: true,
        }}
        style={{
          width: 80,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          onPress();
          console.log("pressed");
        }}
      >
        <Icon size={25} color={color} />
      </Pressable>
    </View>
  );
}
