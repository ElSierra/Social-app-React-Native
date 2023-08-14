import { View, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Fab from "../../components/home/post/components/Fab";
import { AddIcon } from "../../components/icons";
import PostBuilder from "../../components/home/post/PostBuilder";
import { postLists } from "../../data/test";

import { FlashList } from "@shopify/flash-list";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import useGetMode from "../../hooks/GetMode";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useGetUserQuery, useTokenValidQuery } from "../../redux/api/user";

export default function Home() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log("🚀 ~ file: Home.tsx:15 ~ Home ~ apiUrl:", apiUrl);
  const dark = useGetMode();
  const posts = useAppSelector((state) => state.post);
  const isDark = dark;
  const color = isDark ? "white" : "black";
  const backgroundColor = !isDark ? "white" : "black";
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;

  
  const renderItem = ({ item }: { item: any }) => (
    <PostBuilder
      imageUri={item.imageUri}
      name={item.name}
      userTag={item.userTag}
      verified={item.verified}
      audioUri={item.audioUri}
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
      <Fab item={<AddIcon size={30} color={color} />} />
      <FlashList
        data={posts}
        decelerationRate={0.991}
        estimatedItemSize={300}
        keyExtractor={keyExtractor}
        estimatedListSize={{ width, height }}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}
      />
    </View>
  );
}
