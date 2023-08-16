import { View, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Fab from "../../components/home/post/components/Fab";
import { AddIcon } from "../../components/icons";
import PostBuilder from "../../components/home/post/PostBuilder";
import { postLists } from "../../data/test";

import { FlashList } from "@shopify/flash-list";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import useGetMode from "../../hooks/GetMode";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useGetUserQuery, useTokenValidQuery } from "../../redux/api/user";
import { signOut } from "../../redux/slice/user";
import { ActivityIndicator } from "react-native-paper";
import { IPost } from "../../types/api";
import { useGetAllPostsQuery } from "../../redux/api/services";

export default function Home() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log("🚀 ~ file: Home.tsx:15 ~ Home ~ apiUrl:", apiUrl);
  const dark = useGetMode();
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.post);
  const isDark = dark;
  const color = isDark ? "white" : "black";
  const backgroundColor = !isDark ? "white" : "black";
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  const userAuthValidate = useTokenValidQuery(null);
  useGetAllPostsQuery(null);
  console.log(
    "🚀 ~ file: Home.tsx:27 ~ Home ~ userAuthValidate:",
    userAuthValidate
  );
  useEffect(() => {
    if (userAuthValidate.data?.msg === false) {
      dispatch(signOut());
    }
  }, [userAuthValidate.data?.msg]);
  const renderItem = ({ item }: { item: IPost }) => (
    <PostBuilder
      imageUri={item.user?.imageUri}
      name={item.user?.name}
      userTag={item.user?.userName}
      verified={item.user?.verified}
      audioUri={item.audioUri || undefined}
      photoUri={item.photoUri}
      videoTitle={item.videoTitle || undefined}
      videoUri={item.videoUri || undefined}
      postText={item.postText}
      videoViews={item.videoViews?.toString()}
    />
  );
  const keyExtractor = (item: IPost) => item.id.toString();
  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <Fab item={<AddIcon size={30} color={color} />} />
      {posts.loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"}/>
        </View>
      ) : (
        <FlashList
          data={posts.data}
          decelerationRate={0.991}
          estimatedItemSize={300}
          keyExtractor={keyExtractor}
          estimatedListSize={{ width, height }}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}
        />
      )}
    </View>
  );
}
