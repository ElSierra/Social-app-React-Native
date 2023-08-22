import { View, Text, FlatList } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import PostsContainer from "../PostsContainer";
import { SearchSkeleton } from "../Skeleton/SearchSkeleton";
import { IPostContent } from "../../../types/api";
import { postState } from "../../../redux/slice/post";

export default function Posts({ posts }: { posts: postState }) {
  return (
    <View style={{ gap: 5, marginVertical: 20, height: 200 }}>
      {posts.loading && (
        <Animated.View
          entering={FadeIn.springify()}
          style={{ gap: 5 }}
          exiting={FadeOut.springify()}
        >
          {[0, 1, 2].map((idx) => (
            <SearchSkeleton key={idx} />
          ))}
        </Animated.View>
      )}
      <FlatList
        data={posts.data}
        contentContainerStyle={{ gap: 5 }}
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
    </View>
  );
}
