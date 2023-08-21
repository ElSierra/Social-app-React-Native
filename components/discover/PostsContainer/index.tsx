import { View, Text, Dimensions, Pressable } from "react-native";

import { Image } from "expo-image";
import { Button } from "react-native-paper";
import { BlurView } from "expo-blur";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { useState } from "react";
import { IPostBuilder } from "../../home/post/PostBuilder";
const { width } = Dimensions.get("screen");
export default function PostsContainer({
  imageUri,
  name,
  userTag,
  photoUri,
  verified,
  videoUri,
  postText,
  videoTitle,
  videoViews,
  title,
  id,
  audioUri,
}: IPostBuilder) {
  const [follow, setFollow] = useState(false);

  const handleFollow = () => {
    setFollow(!follow);
  };
  return (
    <Animated.View
      entering={FadeInLeft.springify()}
      style={{
        width: "100%",
        overflow: "hidden",
        justifyContent: "space-between",
        padding: 6,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#E5E9F899",
        borderRadius: 20,
      }}
    >
      <BlurView style={{ position: "absolute", height: 100, width }} />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          source={{uri:imageUri}}
          style={{ height: 30, width: 30, borderRadius: 9999 }}
        />
        <View>
          <Text style={{ fontFamily: "jakara", fontSize: 12 }}>@{userTag}</Text>
          <Text style={{ fontFamily: "jakaraBold" }}>
            {postText}
          </Text>
        </View>
      </View>
      <View>
        <Image
          style={{ height: 50, width: 50, borderRadius: 16 }}
          source={{uri: photoUri[0] || videoUri}}
        />
      </View>
    </Animated.View>
  );
}
