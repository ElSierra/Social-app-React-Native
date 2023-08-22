import { View, Text, Dimensions, Pressable } from "react-native";

import { Image } from "expo-image";
import { Button } from "react-native-paper";
import { BlurView } from "expo-blur";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { useState } from "react";
import { IPerson } from "../../../types/api";
const { width } = Dimensions.get("screen");
export default function PeopleContainer({
  name,
  userName,
  id,
  imageUri,
  isFollowed
}: IPerson) {
  const [follow, setFollow] = useState(()=>isFollowed);

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
          source={{ uri: imageUri }}
          style={{ height: 30, width: 30, borderRadius: 9999 }}
        />
        <View>
          <Text style={{ fontSize: 16, fontFamily: "mulishBold" }}>{name}</Text>
          <Text style={{ fontFamily: "jakara", fontSize: 12 }}>
            @{userName}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRadius: 999,
          borderWidth: 1,
          backgroundColor: follow ? "black" : "transparent",
          overflow: "hidden",
          borderColor: "black",
        }}
      >
        <Pressable
          android_ripple={{ color: "white" }}
          onPress={handleFollow}
          style={{ paddingHorizontal: 10, paddingVertical: 6 }}
        >
          <Text
            style={{
              fontFamily: "jakara",
              color: !follow ? "black" : "white",
              includeFontPadding: false,
            }}
          >
            {follow ? "Following" : "Follow"}
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
