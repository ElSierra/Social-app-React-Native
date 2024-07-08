import { View, Text, Animated } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useFocusEffect,
  useIsFocused,
  useNavigationState,
} from "@react-navigation/native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import Recent from "../../components/messages/Recent";
import ChatList from "../../components/messages/ChatList";
import Fab from "../../components/messages/ChatList/Fab";
import { AddMessage, MessagesIcon } from "../../components/icons";
import useGetMode from "../../hooks/GetMode";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { clearNewFromChatList } from "../../redux/slice/chat/chatlist";
import { useLazyGetAllChatsQuery } from "../../redux/api/chat";
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

export default function Messages() {
 
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";
  const dispatch = useAppDispatch();
  const offset = useSharedValue(0);
  console.log("🚀 ~ file: Profile.tsx:16 ~ Profile ~ offset:", offset);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log("🚀 ~ file: Profile.tsx:22 ~ scrollHandler ~ event:", event)

    offset.value = event.contentOffset.y;
  });
  
  const [chatlist, chatlistRes] = useLazyGetAllChatsQuery();
 

  useFocusEffect(
    useCallback(() => {
      chatlist(null).refetch()
      dispatch(clearNewFromChatList());
    }, [])
  );
  return (
    <AnimatedScreen style={{ marginTop: 80, flex: 1 }}>
      <Recent offset={offset} />
      <ChatList scrollHandler={scrollHandler} offset={offset}/>
      <Fab item={<AddMessage size={25} color={color} />} />
    </AnimatedScreen>
  );
}
