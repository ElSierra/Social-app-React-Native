import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeOut,
  runOnJS,
} from "react-native-reanimated";
import PostsContainer from "../PostsContainer";
import { SearchSkeleton } from "../Skeleton/SearchSkeleton";
import { IPostContent } from "../../../types/api";
import { postState } from "../../../redux/slice/post";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator } from "react-native-paper";
import useGetMode from "../../../hooks/GetMode";

export default function Posts({ posts }: { posts: postState }) {
  const [showLoading, setShowLoading] = useState(posts?.data?.length > 8);
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const acolor = !dark ? "white" : "black";
  const handleStopLoading = () => {
    setShowLoading(false);
  };

  function callback() {
    "worklet";
    runOnJS(handleStopLoading)();
  }
  return (
    <View>
      <Animated.View
        entering={FadeInLeft.withCallback(callback)
          .springify()
          .delay(posts?.data?.length > 8 ? 400 : 0)}
        style={{ gap: 5, height: "100%" }}
      >
        {posts.loading && (
          <Animated.View
            entering={FadeIn.springify()}
            style={{ gap: 5 ,marginTop:60}}
            exiting={FadeOut.springify()}
          >
            {[0, 1, 2].map((idx) => (
              <SearchSkeleton key={idx} />
            ))}
          </Animated.View>
        )}
        <FlashList
          data={posts.data}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
          contentContainerStyle={{ paddingTop: 50, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <PostsContainer
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
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Animated.View>
      {showLoading && (
        <Animated.View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <ActivityIndicator color={acolor} size={40} />
        </Animated.View>
      )}
    </View>
  );
}
