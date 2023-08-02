import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

export default function ProfileImage({ imageUri }: { imageUri: string }) {
  return (
    <View style={{ width: "15%" }}>
      <View style={{ width: 50, height: 50 }}>
        <Image
          contentFit="cover"
          style={{ flex: 1, borderRadius: 9999 }}
          source={imageUri}
        />
      </View>
    </View>
  );
}
