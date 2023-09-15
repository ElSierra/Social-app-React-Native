import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import useGetMode from "../../../../hooks/GetMode";

export default function ProfileImage({ imageUri }: { imageUri: string }) {
  const dark = useGetMode()
  return (
    <View style={{ width: 50, height: 50 }}>
      <Image
      placeholder={dark ? require("../../../../assets/images/profile-white.svg"):require("../../../../assets/images/profile-black.svg")}
        contentFit="cover"
        style={{ flex: 1, borderRadius: 9999 }}
        source={{ uri: imageUri }}
      />
    </View>
  );
}
