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
  id,
}: {
  photoUri: string[];
  width: number;
  id: string;
}) {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <View
      style={{
        width: "100%",
        height: 200,
        marginTop: 10,
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
            photoUri: photoUri[0],
            id,
          });
        }}
        style={{
          width: "100%",
          height: 200,
          paddingHorizontal: 4,
          borderRadius: 15,
        }}
      >
        <Image
          style={{ flex: 1, width: "100%", borderRadius: 15 }}
          contentFit="cover"
          source={{ uri: photoUri[0] }}
        />
      </Pressable>
    </View>
  );
}
