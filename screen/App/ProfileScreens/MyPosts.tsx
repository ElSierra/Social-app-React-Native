import {
  View,
  Dimensions,
  RefreshControl,
  Text,
  Pressable,
  Animated as NativeAnimated,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Fab from "../../../components/home/post/components/Fab";
import { AddIcon, ReloadIcon } from "../../../components/icons";
import PostBuilder from "../../../components/home/post/PostBuilder";
import { postLists } from "../../../data/test";
import { useNetInfo } from "@react-native-community/netinfo";
import { FlashList } from "@shopify/flash-list";
import AnimatedScreen from "../../../components/global/AnimatedScreen";
import useGetMode from "../../../hooks/GetMode";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useGetUserQuery, useTokenValidQuery } from "../../../redux/api/user";
import { signOut } from "../../../redux/slice/user";
import { ActivityIndicator } from "react-native-paper";
import { IPost } from "../../../types/api";
import {
  useGetAllPostsQuery,
  useGetRandomPeopleQuery,
  useGetRandomPostsQuery,
  useLazyGetAllPostsQuery,
  useLazyGetMyPostsQuery,
} from "../../../redux/api/services";
import { openToast } from "../../../redux/slice/toast/toast";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  ZoomIn,
} from "react-native-reanimated";
import EmptyLottie from "../../../components/home/post/components/EmptyLottie";
import SkeletonGroupPost from "../../../components/home/misc/SkeletonGroupPost";
import EmptyList from "../../../components/home/misc/EmptyList";
import { resetPost } from "../../../redux/slice/post/myPosts";
import { DrawerHomeProp, HomeProp } from "../../../types/navigation";
import storage from "../../../redux/storage";
import Robot from "../../../components/home/post/misc/Robot";
import Bio from "../../../components/profile/Bio";

export default function MyPosts({ offset }: { offset: NativeAnimated.Value }) {
  const dark = useGetMode();
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.myPost);

  const isDark = dark;
  const color = isDark ? "white" : "black";

  const [skip, setSkip] = useState(0);

  const [noMore, setNoMore] = useState(false);

  useEffect(() => {
    dispatch(resetPost());
  }, []);

  const ref = useRef<any>(null);
  const [getLazyPost, postRes] = useLazyGetMyPostsQuery();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(() => {
    dispatch(resetPost());
    setSkip(0);
    setNoMore(false);
    setRefreshing(false),
      getLazyPost({ take: 20, skip })
        .unwrap()
        .then((e) => {
          setSkip(skip + e.posts.length);

          if (e.posts.length === 0) {
            setNoMore(true);
          }
        })
        .catch((e) => {
          dispatch(
            openToast({ text: "couldn't get recent posts", type: "Failed" })
          );
        });
  }, []);

  const renderFooter = () => {
    if (posts.loading) {
      return (
        <View
          style={{
            marginTop: 20,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={color} size={20} />
        </View>
      );
    }
  };

  useEffect(() => {
    getLazyPost({ take: 20, skip })
      .unwrap()
      .then((e) => {
        setSkip(e.posts?.length);
      })
      .catch((e) => {
        dispatch(
          openToast({ text: "couldn't get recent posts", type: "Failed" })
        );
      });
  }, []);

  const fetchMoreData = () => {
    if (!noMore)
      getLazyPost({ take: 20, skip })
        .unwrap()
        .then((e) => {
          setSkip(skip + e.posts.length);

          if (e.posts.length === 0) {
            setNoMore(true);
          }
        })
        .catch((e) => {
          dispatch(
            openToast({ text: "couldn't get recent posts", type: "Failed" })
          );
        });
  };

  const renderItem = ({ item }: { item: IPost }) => (
    <>
      <PostBuilder
        id={item.id}
        date={item.createdAt}
        comments={item._count.comments}
        like={item._count.like}
        thumbNail={item.videoThumbnail}
        isLiked={item.isLiked}
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
    </>
  );
  const keyExtractor = (item: IPost) => item.id?.toString();
  return (
    <>
      <View style={{ flex: 1 }}>
        <NativeAnimated.FlatList
          ref={ref}
          data={posts.data}
          decelerationRate={0.991}
          ListHeaderComponent={<Bio />}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["red", "blue"]}
            />
          }
          scrollEventThrottle={16}
          onScroll={NativeAnimated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.3}
          onEndReached={fetchMoreData}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
        />
      </View>

    
    </>
  );
}
