import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import FastImage from "react-native-fast-image";
export default function ProfileImage({ imageUri }: { imageUri: string }) {
  return (
    <View style={{ width: 50, height: 50 }}>
      <FastImage
        resizeMode="cover"
        style={{ flex: 1, borderRadius: 9999 }}
        source={{ uri: imageUri }}
      />
    </View>
  );
}
