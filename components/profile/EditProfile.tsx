import { View, Text, Pressable } from "react-native";
import React from "react";
import useGetMode from "../../hooks/GetMode";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../types/navigation";

export default function ButtonOutlined() {
  const dark = useGetMode();
  const navigate = useNavigation<HomeNavigationProp>();
  const color = dark ? "white" : "black";
  return (
    <View>
      <Pressable
        onPress={() => {
          navigate.navigate("EditProfile");
        }}
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderColor: "#B4B4B4D1",
          borderRadius: 999,
          borderWidth: 1,
        }}
      >
        <Text style={{ fontFamily: "jakaraBold", color }}>Edit Profile</Text>
      </Pressable>
    </View>
  );
}
