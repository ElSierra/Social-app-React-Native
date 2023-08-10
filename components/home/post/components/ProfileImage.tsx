import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
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
