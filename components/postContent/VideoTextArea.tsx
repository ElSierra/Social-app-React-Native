import {
  View,
  Text,
  TextInput,
  Dimensions,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import InputText from "../../screen/Auth/components/InputText";
import useGetMode from "../../hooks/GetMode";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
const heightFromScreen = Dimensions.get("window").height;
export default function VideoTextArea(props: TextInputProps) {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const [height, setHeight] = useState(50);
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(400)}
      style={{ padding: 20, minHeight: heightFromScreen / 20 }}
    >
      <TextInput
        multiline
        cursorColor={color}
        onContentSizeChange={(event) => {
          setHeight(event.nativeEvent.contentSize.height);
        }}
        style={{
          fontSize: 16,
          color,

          fontFamily: "mulishMedium",
          maxHeight: height,
          alignItems: "flex-start",
        }}
        placeholder="Video Title"
        {...props}
      />
    </Animated.View>
  );
}
