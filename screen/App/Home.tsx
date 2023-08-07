import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  FlatList,
  Button,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import Fab from "../../components/home/post/components/Fab";
import { AddIcon } from "../../components/icons";
import PostBuilder from "../../components/home/post/PostBuilder";
import { postLists } from "../../data/test";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import useGetMode from "../../hooks/GetMode";
export default function Home() {
  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "white" : "black";
  const backgroundColor = !isDark ? "white" : "black";
  console.log("i rendered");
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  const renderItem = ({ item }: any) => (
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
  );
  const keyExtractor = (item: any) => item.id.toString();
  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <AnimatedScreen>
        <Fab item={<AddIcon size={30} color={color} />} />
        <FlashList
          data={postLists}
          decelerationRate={0.991}
          estimatedItemSize={250}
          keyExtractor={keyExtractor}
          estimatedListSize={{ width, height }}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}
        />
      </AnimatedScreen>
    </View>
  );
}
