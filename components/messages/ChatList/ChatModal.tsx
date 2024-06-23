import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { ActivityIndicator, Portal } from "react-native-paper";
import useGetMode from "../../../hooks/GetMode";

import ChatBuilderText from "../../chat/ChatBuilderText";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import ModalChatText from "../../chat/ModalChatText";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { deleteMessage } from "../../../redux/slice/chat/chatlist";
import useSocket from "../../../hooks/Socket";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("window");

export const ChatModal = React.memo(
  ({
    isOpen,
    closeModal,
    text,
    chatId,
  }: {
    isOpen: boolean;
    closeModal: () => void;
    text: {
      id: string;
      text: string;
      photoUri?: string;
      x: number;
      y: number;
      sent: boolean;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    };
    chatId: string;
  }) => {
    const socket = useSocket();
    const dark = useGetMode();

    const color = !dark ? "black" : "white";
    const tint = dark ? "dark" : "light";
    const dispatch = useAppDispatch();

    const deleteMessageHandler = () => {
      closeModal();
      socket?.emit("deleteMessage", text.id);
      dispatch(deleteMessage({ id: text.id, chatId }));
    
    };
    const isHighEndDevice = useAppSelector((state) => state?.prefs?.isHighEnd);
  const {height:h,width:w} = useWindowDimensions()
console.log("pageY",text.pageY)
    return (
      <>
        <Modal
          statusBarTranslucent
          animationType="fade"
          transparent={true}
          visible={isOpen}
          onRequestClose={closeModal}
        >
          <BlurView
            experimentalBlurMethod= {isHighEndDevice ?"dimezisBlurView": undefined}
            tint={tint}
            style={{ position: "absolute", height, width }}
            intensity={40}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",

              height,
              width,
            }}
          >
            <Pressable
              onPress={closeModal}
              style={{ height: "100%", width: "100%" }}
            >
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "transparent",
                }}
              ></View>
            </Pressable>

            <Animated.View
              style={{
                gap: 10,
                paddingRight: 20,
                position: "absolute",
                top: h/2,
                pointerEvents: "box-none",
              }}
            >
              <ModalChatText
                isMe={true}
                photoUri={text?.photoUri}
                sent={text.sent}
                text={text.text}
                isModal
                time={`${new Date()}`}
              />
              <Animated.View
                entering={FadeInRight.springify()}
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  gap: 3,
                }}
              >
                <Pressable
                  onPress={deleteMessageHandler}
                  style={{
                    paddingVertical: 10,
                    borderWidth: 1,
                    width: 70,
                    alignItems: "center",
                    borderColor: color,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderStyle: "dashed",
                  }}
                >
                  <Text style={{ color }}>Delete</Text>
                </Pressable>
                <Pressable
                  onPress={closeModal}
                  style={{
                    width: 70,
                    borderColor: color,
                    paddingVertical: 10,
                    borderWidth: 1,
                    alignItems: "center",
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderStyle: "dashed",
                  }}
                >
                  <Text style={{ color }}>Cancel</Text>
                </Pressable>
              </Animated.View>
            </Animated.View>
          </View>
        </Modal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
