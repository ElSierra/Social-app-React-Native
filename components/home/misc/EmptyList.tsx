import { View, Text, Pressable } from "react-native";
import React from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import EmptyLottie from "../post/components/EmptyLottie";
import useGetMode from "../../../hooks/GetMode";
import { ReloadIcon } from "../../icons";
import { useLazyGetAllPostsQuery } from "../../../redux/api/services";

export default function EmptyList({handleRefetch}:{handleRefetch:()=>void}) {
  const dark = useGetMode();
  const isDark = dark;
  const [getPosts] = useLazyGetAllPostsQuery();
  const color = isDark ? "white" : "black";
  const backgroundColor = !isDark ? "#FFFFFFD2" : "#0000008F";
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View
        style={{
          height: 100,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        entering={FadeInDown.springify().duration(400)}
        exiting={FadeOutDown.springify()}
      >
        <EmptyLottie />
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            height: 40,
            bottom: 11,

            width: 40,
            borderRadius: 9999,
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          <Pressable
            onPress={handleRefetch}
            android_ripple={{ color }}
            style={{
              backgroundColor,

              alignItems: "center",
              height: 40,
              width: 40,
              paddingBottom: 2,
              borderRadius: 9999,
              justifyContent: "center",
            }}
          >
            <ReloadIcon size={30} color={color} />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}
