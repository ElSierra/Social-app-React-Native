import { View, Text, Dimensions, Pressable } from "react-native";

import { Image } from "expo-image";
import { Button } from "react-native-paper";
import { BlurView } from "expo-blur";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { useState } from "react";

import { AudioIcon, ProfileIcon } from "../../icons";
import useGetMode from "../../../hooks/GetMode";
import { SearchPostBuilder } from "../../../types/app";

const { width } = Dimensions.get("screen");
export default function PostsContainer({
  imageUri,
  id,
  userTag,
  photoUri,
  verified,
  videoUri,
  postText,

  audioUri,
}: SearchPostBuilder) {
  const [follow, setFollow] = useState(false);
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const backgroundColor = !dark ? "#E5E9F899" : "#25252599";

  const handleFollow = () => {
    setFollow(!follow);
  };

  const assetRender = () => {
    if (photoUri[0] || videoUri) {
      return (
        <View style={{ height: 50, width: 50 }}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 16 }}
            source={{ uri: photoUri[0] || videoUri }}
          />
        </View>
      );
    }
    if (audioUri) {
      return (
        <View style={{ height: 50, width: 50 }}>
          <AudioIcon size={50} color={color} />
        </View>
      );
    }
  };
  return (
    <View
      style={{
        width: "100%",
        marginBottom: 5,
        overflow: "hidden",
        justifyContent: "space-between",
        padding: 6,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor,
        borderRadius: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {imageUri ? (
          <FastImage
            source={{ uri: imageUri }}
            style={{ height: 30, width: 30, borderRadius: 9999 }}
          />
        ) : (
          <ProfileIcon size={34} color={color} />
        )}
        <View>
          <Text style={{ fontFamily: "jakara", fontSize: 12, color }}>
            @{userTag}
          </Text>
          <Text
            style={{
              fontFamily: "jakaraBold",
              width:
                videoUri || photoUri[0] || audioUri ? width * 0.6 : width * 0.8,
              color,
            }}
            numberOfLines={1}
          >
            {postText}
          </Text>
        </View>
        <View style={{ width: "4%" }} />
        <View style={{ width: "30%" }}>{assetRender()}</View>
      </View>
    </View>
  );
}
