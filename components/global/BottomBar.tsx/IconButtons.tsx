import { View, Text, Pressable } from "react-native";
import React, { ElementType } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  HomeNavigationProp,
  RootStackParamList,
} from "../../../types/navigation";

export default function IconButtons({
  Icon,
  routeName,
}: {
  Icon: ElementType;
  routeName:
    | "Main"
    | "ImageFullScreen"
    | "Profile"
    | "Messages"
    | "Discover"
    | "Notifications";
}) {
  const navigate = useNavigation<HomeNavigationProp>();
  return (
    <View style={{ width: 60, height: 50 ,borderRadius:60, overflow:"hidden"}}>
      <Pressable
        android_ripple={{ color: "#0000004B"}}
        style={{
          width: 60,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius:60,
        }}
        onPress={() => {
          //@ts-ignore
          navigate.navigate(routeName);
        }}
      >
        <Icon size={25} color="black" />
      </Pressable>
    </View>
  );
}
