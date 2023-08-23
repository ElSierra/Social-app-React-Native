import {
  View,
  Dimensions,
  RefreshControl,
  Text,
  Pressable,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Fab from "../../components/home/post/components/Fab";
import { AddIcon, ReloadIcon } from "../../components/icons";
import PostBuilder from "../../components/home/post/PostBuilder";
import { postLists } from "../../data/test";
import { useNetInfo } from "@react-native-community/netinfo";
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
  useGetRandomPeopleQuery,
  useGetRandomPostsQuery,
  useLazyGetAllPostsQuery,
} from "../../redux/api/services";
import { openToast } from "../../redux/slice/toast/toast";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  ZoomIn,
} from "react-native-reanimated";
import EmptyLottie from "../../components/home/post/components/EmptyLottie";
import SkeletonGroupPost from "../../components/home/misc/SkeletonGroupPost";
import EmptyList from "../../components/home/misc/EmptyList";
import { resetPost } from "../../redux/slice/post";
import { DrawerHomeProp, HomeProp } from "../../types/navigation";

export default function Home({ navigation }: DrawerHomeProp) {
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

  const [skip, setSkip] = useState(0);
  const [noMore, setNoMore] = useState(false);

  const userAuthValidate = useTokenValidQuery(null);
  useGetAllPostsQuery({
    take: 10,
    skip: 0,
  });
  useGetUserQuery(null);
  useGetRandomPostsQuery(null);
  useGetRandomPeopleQuery(null);
  const ref = useRef<any>(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Pressable
            onPress={() => {
              ref.current.scrollToOffset({ animated: true, offset: 0 });
            }}
          >
            <Text style={{ fontFamily: "uberBold", fontSize: 20, color }}>
              Qui
            </Text>
          </Pressable>
        );
      },
    });
  }, [color]);
  const [getLazyPost, postRes] = useLazyGetAllPostsQuery();
  const [refreshing, setRefreshing] = React.useState(false);
  const [fab, showFab] = useState(true);
  const onRefresh = useCallback(() => {
    dispatch(resetPost());
    setSkip(0);
    setRefreshing(true),
      getLazyPost({ take: 10, skip: 0 })
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
  const renderFooter = () => {
    if (noMore) {
      return (
        <View
          style={{
            width: "100%",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "mulishBold" }}>No More Posts</Text>
        </View>
      );
    } else if (posts.loading) {
      return (
        <Animated.View
          exiting={FadeOut.duration(50)}
          entering={FadeIn.duration(50)}
          style={{
            marginTop: 20,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={color} size={20} />
        </Animated.View>
      );
    }
  };

  useEffect(() => {
    if (skip !== 0 && !noMore && !posts.loading)
      getLazyPost({ take: 10, skip })
        .unwrap()
        .then((r) => {
          console.log("🚀 ~ file: Home.tsx:78 ~ .then ~ r:", r);
          setNoMore(r.posts?.length === 0);
        })
        .catch((e) => {
          dispatch(
            openToast({ text: "couldn't get recent posts", type: "Failed" })
          );
        });
  }, [skip, noMore]);

  const fetchMoreData = () => {
    setSkip(skip + 10);
  };
  const handleRefetch = () => {
    setSkip(0);
    getLazyPost({ take: 10, skip: 0 })
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
  };

  useEffect(() => {
    //@ts-ignore
    if (userAuthValidate.error?.data?.msg === "invalid token") {
      dispatch(signOut());
    }
  }, [userAuthValidate.data?.msg]);
  const renderItem = ({ item }: { item: IPost }) => (
    <PostBuilder
      id={item.id}
      comments={item._count.comments}
      like={item._count.like}
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
  );
  const keyExtractor = (item: IPost) => item.id?.toString();
  return (
    <AnimatedScreen>
      {posts.loading && posts.data.length === 0 ? (
        <SkeletonGroupPost />
      ) : posts.data.length === 0 ? (
        <EmptyList handleRefetch={handleRefetch} />
      ) : (
        <Animated.View
          style={{ flex: 1 }}
          entering={FadeInDown.springify().duration(400)}
          exiting={FadeOutDown.springify()}
        >
          <FlashList
            ref={ref}
            data={posts.data}
            decelerationRate={0.991}
            estimatedItemSize={300}
            ListFooterComponent={renderFooter}
            onScrollEndDrag={() => showFab(true)}
            onScrollBeginDrag={() => showFab(false)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["red", "blue"]}
              />
            }
            keyExtractor={keyExtractor}
            onEndReachedThreshold={0.6}
            onEndReached={fetchMoreData}
            estimatedListSize={{ width, height }}
            renderItem={renderItem}
            contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}
          />
        </Animated.View>
      )}
      {fab && <Fab item={<AddIcon size={30} color={color} />} />}
    </AnimatedScreen>
  );
}
