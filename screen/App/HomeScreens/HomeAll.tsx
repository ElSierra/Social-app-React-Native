import {
  View,
  Dimensions,
  RefreshControl,
  Text,
  Pressable,
  FlatList,
  ViewToken,
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
} from "../../../redux/api/services";
import { openToast } from "../../../redux/slice/toast/toast";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  SequencedTransition,
  ZoomIn,
} from "react-native-reanimated";
import EmptyLottie from "../../../components/home/post/components/EmptyLottie";
import SkeletonGroupPost from "../../../components/home/misc/SkeletonGroupPost";
import EmptyList from "../../../components/home/misc/EmptyList";
import { resetPost } from "../../../redux/slice/post";
import { resetPost as resetFollowedPosts } from "../../../redux/slice/post/followed";
import { DrawerHomeProp, HomeProp } from "../../../types/navigation";
import storage from "../../../redux/storage";
import Robot from "../../../components/home/post/misc/Robot";
import { setPlayingIds } from "../../../redux/slice/post/audio";

export default function HomeAll() {
  const dark = useGetMode();
  const dispatch = useAppDispatch();
  const authId = useAppSelector((state) => state.user.data?.id);
  const posts = useAppSelector((state) => state.post);

  const isDark = dark;
  const color = isDark ? "white" : "black";
  const backgroundColor = !isDark ? "white" : "black";
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  const [skip, setSkip] = useState(0);

  const [noMore, setNoMore] = useState(false);

  const [getLazyPost, postRes] = useLazyGetAllPostsQuery({});
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    getLazyPost({ take: 20, skip: 0 })
      .unwrap()
      .then((r) => {});
  }, []);
  const onRefresh = useCallback(() => {
    if (!authId) return;
    setSkip(0);
    setNoMore(false);
    setRefreshing(true);
    getLazyPost({ take: 20, skip: 0 })
      .unwrap()
      .then((e) => {
        setSkip(e.posts.length);
        setRefreshing(false);
        if (e.posts.length === 0) setNoMore(true);
      })
      .catch(() => {
        setRefreshing(false);
        dispatch(
          openToast({ text: "Couldn't get recent posts", type: "Failed" })
        );
      });
  }, [authId, dispatch, getLazyPost]);

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
          <Robot />
        </View>
      );
    } else if (posts.loading) {
      return (
        <Animated.View
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

  // useEffect(() => {
  //   if (skip !== 0 && !noMore && !posts.loading)
  //     getLazyPost({ take: 10, skip })
  //       .unwrap()
  //       .then((r) => {
  //         setSkip(r.posts?.length || 0);
  //         setNoMore(r.posts?.length === 0);
  //       })
  //       .catch((e) => {
  //         dispatch(
  //           openToast({ text: "couldn't get recent posts", type: "Failed" })
  //         );
  //       });
  // }, [skip, noMore]);

  useEffect(() => {
    getLazyPost({ take: 20, skip })
      .unwrap()
      .then((e) => {
        setSkip(e.posts?.length);
      })
      .catch((e) => {
        // dispatch(
        //   openToast({ text: "couldn't get recent posts", type: "Failed" })
        // );
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
          // dispatch(
          //   openToast({ text: "couldn't get recent posts", type: "Failed" })
          // );
        });
  };
  const handleRefetch = () => {
    setSkip(0);
    setNoMore(false);
    getLazyPost({ take: 10, skip: 0 })
      .unwrap()
      .then((r) => {
        setRefreshing(false);
      })
      .catch((e) => {
        setRefreshing(false);
        // dispatch(
        //   openToast({ text: "couldn't get recent posts", type: "Failed" })
        // );
      });
  };

  const [indexInView, setIndexInView] = useState<Array<number | null>>([]);

  const renderItem = ({ item, index }: { item: IPost; index: number }) => (
    <PostBuilder
      id={item.id}
      isReposted={
        item?.repostUser?.find((repostUser) => repostUser?.id === authId)
          ? true
          : false
      }
      date={item.createdAt}
      link={item.link}
      comments={item._count?.comments}
      like={item._count?.like}
      isLiked={
        item?.like?.find((like) => like?.userId === authId) ? true : false
      }
      photo={
        item.photo
          ? {
              uri: item.photo?.imageUri,
              width: item.photo?.imageWidth,
              height: item.photo?.imageHeight,
            }
          : undefined
      }
      thumbNail={item.videoThumbnail}
      imageUri={item.user?.imageUri}
      name={item.user?.name}
      userId={item.user?.id}
      userTag={item.user?.userName}
      verified={item.user?.verified}
      audioUri={item.audioUri || undefined}
      photoUri={item.photoUri}
      videoTitle={item.videoTitle || undefined}
      videoUri={item.videoUri || undefined}
      postText={item.postText}
      videoViews={item.videoViews?.toString()}
      idx={index}
    />
  );
  const keyExtractor = (item: IPost) => item?.id?.toString();

  const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // This means a component is considered visible if at least 50% of it is visible
  };

  const onViewableItemsChanged = useRef<
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => void
  >(({ viewableItems, changed }) => {
    console.log("Viewable Items:", viewableItems);
    const indexes: Array<number | null> = [];
    viewableItems.map((view) => {
      indexes.push(view.index);
    });
    setIndexInView(indexes);
    dispatch(setPlayingIds(indexes));
    console.log("view", indexes);
    console.log("Changed in this interaction:", changed);
  });

  const getItemLayout = (data, index) => ({
    length: data[index].height,
    offset: data.slice(0, index).reduce((acc, item) => acc + item.height, 0),
    index,
  });

  return (
    <View style={{ flex: 1 }}>
      {posts.loading && posts.data.length === 0 ? (
        <SkeletonGroupPost />
      ) : posts.data.length === 0 ? (
        <EmptyList handleRefetch={handleRefetch} />
      ) : (
        <Animated.View style={{ flex: 1 }}>
          <FlashList
            data={posts?.data}
            decelerationRate={0.991}
            estimatedItemSize={100}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["red", "blue"]}
              />
            }
            // onViewableItemsChanged={onViewableItemsChanged.current}
            // viewabilityConfig={viewabilityConfig}
            keyExtractor={keyExtractor}
            estimatedListSize={{ width: width, height: height }}
            onEndReachedThreshold={0.3}
            onEndReached={fetchMoreData}
            renderItem={renderItem}
            contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}
          />
        </Animated.View>
      )}
      <Fab item={<AddIcon size={30} color={color} />} />
    </View>
  );
}
