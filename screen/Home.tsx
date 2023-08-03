import { View, Text, ScrollView, useColorScheme, FlatList, Button } from "react-native";
import React from "react";
import Fab from "../components/home/post/components/Fab";
import { AddIcon } from "../components/icons";
import PostBuilder from "../components/home/post/PostBuilder";
import { postLists } from "../data/test";
import Animated, { FadeIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
export default function Home() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const navigate = useNavigation();
  return (
    <Animated.View entering={FadeIn.duration(400)} style={{flex:1}}>

      <Fab item={<AddIcon size={30} color="#D864A9" />} />
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
  );
}
