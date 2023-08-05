import { View, Text, Pressable, useColorScheme } from "react-native";
import React, { ElementType } from "react";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp, RootStackParamList } from "../../types/navigation";

export default function IconButtons({
  Icon,
  onPress,
}: {
  Icon: ElementType;
  onPress: () => void;
}) {
  const navigate = useNavigation<HomeNavigationProp>();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const color = isDark ? "white" : "black";
  return (
    <Pressable
      android_ripple={{ color: "#0000004B", borderless: true, }}
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
  );
}
