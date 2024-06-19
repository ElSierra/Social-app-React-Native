import { View, Text, TextInput, Pressable, TextInputProps,Platform } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { SendIcon } from "../icons";
import useGetMode from "../../hooks/GetMode";
import { IChatMessage } from "../../types/api";
import PickImageButton from "./PickImageButton";

export default function ChatBox({
  props,
  onPress,
  handleSetPhotoPost,
}: {
  props: TextInputProps;
  onPress: () => void;
  handleSetPhotoPost: (mimeType: string, uri: string, size: number) => void;
}) {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const tint = dark ? "dark" : "light";
  const rippleColor = dark ? "#000000" : "#A1A0A0";
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        overflow: "hidden",
        borderRadius: 9999,
        minHeight: 55,
        borderWidth: 0.5,
        borderColor: "#B4B4B488",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <BlurView
        tint={tint}
        intensity={100}
        experimentalBlurMethod="dimezisBlurView"
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <PickImageButton handleSetPhotoPost={handleSetPhotoPost} />
      <TextInput
        multiline
        placeholder="Type Message 😒"
        placeholderTextColor={"grey"}
        cursorColor={color}
        style={{
          width: "70%",
          height: "100%",
          maxHeight: 100,
          color,
          paddingLeft: 20,
          paddingVertical: Platform.select({ios:20,android:10}),
        }}
        {...props}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 999,
          }}
        >
          <Pressable
            onPress={onPress}
            style={{
              height: 40,
              width: 40,
              overflow: "hidden",
              borderRadius: 999,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SendIcon size={25} color={color} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
