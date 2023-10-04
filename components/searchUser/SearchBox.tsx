import {
  View,
  Text,
  TextInput,
  StyleProp,
  ViewStyle,
  Dimensions,
} from "react-native";
import useGetMode from "../../hooks/GetMode";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../hooks/Debounce";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");
export default function SearchBox({
  setSearchParam,
}: {
  setSearchParam: (text: string) => void;
}) {
  const dark = useGetMode();

  const color = dark ? "white" : "black";
  const placeholderColor = !dark ? "grey" : "grey";
  const borderColor = dark ? "#FFFFFF" : "#DAD9D9";
  const tint = dark ? "dark" : "light";
  const backgroundColor = dark ? "#383838" : "#EAEBEB";
  return (
    <Animated.View
      entering={FadeInRight.springify()}
      style={[
        {
          width: width * 0.7,
          height: 40,

          backgroundColor,
          overflow: "hidden",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        },
      ]}
    >
      <TextInput
        cursorColor={color}
        placeholder="@someone"
        onChangeText={(text) => setSearchParam(text)}
        placeholderTextColor={placeholderColor}
        style={{
          width: "100%",
          fontSize: 16,
          color,
          fontFamily: "jakara",
          includeFontPadding: false,
        }}
      />
    </Animated.View>
  );
}
