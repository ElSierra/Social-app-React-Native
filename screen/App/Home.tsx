import { View, Dimensions, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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
import {
  useGetAllPostsQuery,
  useGetRandomPostsQuery,
  useLazyGetAllPostsQuery,
} from "../../redux/api/services";
import { openToast } from "../../redux/slice/toast/toast";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  ZoomIn,
} from "react-native-reanimated";
import EmptyLottie from "../../components/home/post/components/EmptyLottie";
import SkeletonGroupPost from "../../components/home/misc/SkeletonGroupPost";

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
  useGetRandomPostsQuery(null);
  const [getLazyPost, postRes] = useLazyGetAllPostsQuery();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true),
      getLazyPost(null)
        .unwrap()
        .then((r) => {
          setRefreshing(false);
        })
        .catch((e) => {
          setRefreshing(false);
          dispatch(
            openToast({ text: "couldn't get recent posts", type: "Failed" })
          );
        });
  }, []);

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
      id={item.id}
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
    <AnimatedScreen>
      <Fab item={<AddIcon size={30} color={color} />} />
      {posts.loading ? (
        <SkeletonGroupPost />
      ) : posts.data.length === 0 ? (
        <Animated.View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          entering={FadeInDown.springify().duration(400)}
          exiting={FadeOutDown.springify()}
        >
          <EmptyLottie />
        </Animated.View>
      ) : (
        <Animated.View
          style={{ flex: 1 }}
          entering={FadeInDown.springify().duration(400)}
          exiting={FadeOutDown.springify()}
        >
          <FlashList
            data={posts.data}
            decelerationRate={0.991}
            estimatedItemSize={300}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["red", "blue"]}
              />
            }
            keyExtractor={keyExtractor}
            estimatedListSize={{ width, height }}
            renderItem={renderItem}
            contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}
          />
        </Animated.View>
      )}
    </AnimatedScreen>
  );
}
