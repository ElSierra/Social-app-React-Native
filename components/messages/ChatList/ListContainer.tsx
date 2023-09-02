import { View, Text, Pressable } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";

export default function ListContainer() {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <Pressable
      style={{ width: "100%", padding: 20 }}
      android_ripple={{ color: "white" }}
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
            <Text style={{ fontFamily: "jakaraBold", fontSize: 16 }}>
              @hojoisaac
            </Text>
            <Text style={{ fontFamily: "mulishRegular", fontSize: 16 }}>
              Please help me{" "}
            </Text>
          </View>
        </View>
        <Text style={{ fontFamily: "jakara", fontSize: 14 }}>08:43</Text>
      </View>
    </Pressable>
  );
}
