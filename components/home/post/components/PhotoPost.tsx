import {
  View,
  Text,
  FlatList,
  Pressable,
  Button,
  Image as RNImage,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../../types/navigation";
import { useState } from "react";

export default function PhotoPost({
  photoUri,
  width,
  height,
  id,
}: {
  photoUri: string;
  width: number;
  height: number;
  id: string;
}) {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <View
      style={{
        width: "100%",
        height: 200,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        android_ripple={{ color: "#000000", foreground: true }}
        onPress={() => {
          navigation.navigate("ImageFullScreen", {
            photoUri: photoUri,
            id,
            height,
            width,
          });
        }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 15,
        }}
      >
        <Image
          style={{ height: "100%", width: "100%" }}
          placeholder={require("../../../../assets/images/placeholder.png")}
          placeholderContentFit="cover"
          contentFit="cover"
          transition={1000}
          source={{ uri: photoUri }}
        />
      </Pressable>
    </View>
  );
}
