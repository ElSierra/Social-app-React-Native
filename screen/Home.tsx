import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  FlatList,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import Fab from "../components/home/post/components/Fab";
import { AddIcon } from "../components/icons";
import PostBuilder from "../components/home/post/PostBuilder";
import { postLists } from "../data/test";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import CustomBottomBar from "../components/global/BottomBar.tsx/CustomBottomBar";
import AnimatedScreen from "../components/global/AnimatedScreen";



export default function Home() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const color = isDark? "white": "black";

  const isFocused = useIsFocused();

  return (
    <>
      <Animated.View
      style={{flex:1}}
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(400)}
      >
        <Fab item={<AddIcon size={30} color={color} />} />
        <FlatList
          data={postLists}
          renderItem={({ item }) => (
            <PostBuilder
              imageUri={item.imageUri}
              name={item.name}
              userTag={item.userTag}
              verified={item.verified}
              photoUri={item.photoUri}
              videoTitle={item.videoTitle}
              videoUri={item.videoUri}
              postText={item.postText}
              videoViews={item.videoViews}
            />
          )}
          contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}
          style={{
            flex: 1,
            backgroundColor: isDark ? "black" : "white",
            paddingBottom: 0,
          }}
        />
      </Animated.View>
      <CustomBottomBar home={isFocused} />
    </>
  );
}
