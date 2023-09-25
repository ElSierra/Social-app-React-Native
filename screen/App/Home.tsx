import { Text, Pressable } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import AnimatedScreen from "../../components/global/AnimatedScreen";
import useGetMode from "../../hooks/GetMode";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useGetUserQuery, useTokenValidQuery } from "../../redux/api/user";
import { signOut } from "../../redux/slice/user";

import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";

import { DrawerHomeProp } from "../../types/navigation";

import HomeAll from "./HomeScreens/HomeAll";
import HomeFollowed from "./HomeScreens/HomeFollowed";
import { useGetAllChatsQuery } from "../../redux/api/chat";
import socket from "../../util/socket";
import { useNavigationState } from "@react-navigation/native";

export default function Home({ navigation }: DrawerHomeProp) {
  const dark = useGetMode();

  const isDark = dark;
  const color = isDark ? "white" : "black";
  const dispatch = useAppDispatch();
  const [isAll, setIsAll] = useState(true);

  // useGetRandomPostsQuery(null);
  // useGetRandomPeopleQuery(null);

  const userAuthValidate = useTokenValidQuery(null);
  useEffect(() => {
    //@ts-ignore
    if (userAuthValidate.isError) {
      dispatch(signOut());
    }
  }, [userAuthValidate]);

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
    <AnimatedScreen>{isAll ? <HomeAll /> : <HomeFollowed />}</AnimatedScreen>
  );
}
