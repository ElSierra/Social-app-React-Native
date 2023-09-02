import { View, Text, Pressable } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import useGetMode from "../../../hooks/GetMode";

export default function ListContainer() {
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";
  const rColor = !dark ? "#FFFFFF" : "#000000";
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <Pressable
      style={{ width: "100%", padding: 15, paddingHorizontal: 20 }}
      android_ripple={{ color: rColor }}
      onPress={() =>
        navigation.navigate("ChatScreen", {
          id: "",
          name: "ojo isaac",
          imageUri: "",
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <FastImage
            style={{ borderRadius: 999, height: 50, width: 50 }}
            source={require("../../../assets/avatar/placeholder.png")}
          />
          <View style={{}}>
            <Text style={{ fontFamily: "jakaraBold", fontSize: 16, color }}>
              @hojoisaac
            </Text>
            <Text
              style={{
                fontFamily: "mulishRegular",
                fontSize: 16,
                color: "grey",
              }}
            >
              Please help me{" "}
            </Text>
          </View>
        </View>
        <Text style={{ fontFamily: "jakara", fontSize: 14, color: "grey" }}>
          08:43
        </Text>
      </View>
    </Pressable>
  );
}
