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
} from "react-native";
import { ActivityIndicator, Portal } from "react-native-paper";
import useGetMode from "../../../hooks/GetMode";

import ChatBuilderText from "../../chat/ChatBuilderText";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");
export const ChatModal = ({
  isOpen,
  closeModal,
  text,
}: {
  isOpen: boolean;
  closeModal: () => void;
  text: { id: string; text: string };
}) => {
  const dark = useGetMode();

  const color = !dark ? "black" : "white";
  const tint = dark ? "dark" : "light";

  const [postPhoto, setPostPhoto] = useState<{
    mimeType: string;
    uri: string;
    size: number;
  } | null>(null);

  return (
   
      <Portal>
        <View style={styles.centeredView}>
          <Modal
            statusBarTranslucent
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={closeModal}
          >
            <BlurView
              tint={tint}
              style={{ position: "absolute", height, width }}
              intensity={15}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
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
                  position: "absolute",
                  pointerEvents: "box-none",
                }}
                entering={FadeInRight.springify()}
                
              >
                <ChatBuilderText
                  isMe={true}
                  text={text.text}
                  isModal
                  time={`${new Date()}`}
                />
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Pressable
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      borderStyle: "dashed",
                    }}
                  >
                    <Text>Delete</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      borderStyle: "dashed",
                    }}
                  >
                    <Text>Cancel</Text>
                  </Pressable>
                </View>
              </Animated.View>
            </View>
          </Modal>
        </View>
      </Portal>
    
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position:"absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
