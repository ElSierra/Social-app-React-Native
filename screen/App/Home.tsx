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
  useLazyGetFollowedPostsQuery,
} from "../../redux/api/services";
import { openToast } from "../../redux/slice/toast/toast";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutRight,
  ZoomIn,
} from "react-native-reanimated";
import EmptyLottie from "../../components/home/post/components/EmptyLottie";
import SkeletonGroupPost from "../../components/home/misc/SkeletonGroupPost";
import EmptyList from "../../components/home/misc/EmptyList";
import { resetPost } from "../../redux/slice/post";
import { DrawerHomeProp, HomeProp } from "../../types/navigation";
import storage from "../../redux/storage";
import Robot from "../../components/home/post/misc/Robot";
import HomeAll from "./HomeScreens/HomeAll";
import HomeFollowed from "./HomeScreens/HomeFollowed";

export default function Home({ navigation }: DrawerHomeProp) {
  const dark = useGetMode();

  const isDark = dark;
  const color = isDark ? "white" : "black";
  const dispatch = useAppDispatch();
  const [isAll, setIsAll] = useState(true);
  useGetUserQuery(null);
  // useGetRandomPostsQuery(null);
  // useGetRandomPeopleQuery(null);

  const userAuthValidate = useTokenValidQuery(null);
  useEffect(() => {
    //@ts-ignore
    if (userAuthValidate.error?.data?.msg === "invalid token") {
      dispatch(signOut());
    }
  }, [userAuthValidate.data?.msg]);
  const ref = useRef<any>(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            onPress={() => {
              setIsAll(!isAll);
            }}
            style={{
              marginRight: 20,
              borderColor: color,
              borderWidth: 1,
              padding: 2,
              borderRadius: 999,

              borderStyle: "dotted",
            }}
          >
            {isAll ? (
              <Animated.View
                key={"all"}
                entering={FadeInRight.springify()}
                exiting={FadeOutRight.springify()}
              >
                <Text style={{ fontFamily: "uberBold", fontSize: 12, color }}>
                  {"All Posts"}
                </Text>
              </Animated.View>
            ) : (
              <Animated.View
                key={"followed"}
                entering={FadeInRight.springify()}
                exiting={FadeOutRight.springify()}
              >
                <Text style={{ fontFamily: "uberBold", fontSize: 12, color }}>
                  {"Followed Posts"}
                </Text>
              </Animated.View>
            )}
          </Pressable>
        );
      },
    });
  }, [color, isAll]);

  return (
    <AnimatedScreen >{isAll ? <HomeAll /> : <HomeFollowed />}</AnimatedScreen>
  );
}
