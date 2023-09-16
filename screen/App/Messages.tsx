import { View, Text, Animated } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
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

export default function Messages() {
  const offset = useRef(new Animated.Value(0)).current;
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      offset.removeAllListeners();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(clearNewFromChatList());
    }, [])
  );
  return (
    <AnimatedScreen style={{ marginTop: 80, flex: 1 }}>
      <Recent offset={offset} />
      <ChatList offset={offset} />
      <Fab item={<AddMessage size={25} color={color} />} />
    </AnimatedScreen>
  );
}
