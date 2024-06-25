import { View, Text, Pressable } from "react-native";
import React from "react";
import useGetMode from "../../../../hooks/GetMode";
import Animated, {
  BounceIn,
  BounceOut,
  FadeInDown,
  FadeInUp,
  FadeOutDown,
} from "react-native-reanimated";

export default function CommentButton({
  isLoading,
  isDisabled,
  onPress,
}: {
  isLoading: boolean;
  isDisabled?: boolean;
  onPress: () => void;
}) {
  const dark = useGetMode();

  const backgroundColor = dark ? "white" : "black";
  const backgroundColorLoad = dark ? "#FFFFFF38" : "#00000041";
  const rippleColor = !dark ? "white" : "black";
  const color = !dark ? "white" : "black";
  return (
    <View
      style={{
        backgroundColor: !isLoading ? backgroundColor : backgroundColorLoad,
        height: 45,
        width: 80,
        opacity: isDisabled ? 0.5 : 1,
        borderRadius: 9999,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Pressable
        disabled={isLoading || isDisabled}
        onPress={onPress}
        android_ripple={{ color: rippleColor, foreground: true }}
        style={{
          height: 45,
          width: 80,

          borderRadius: 9999,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color, fontFamily: "mulish" }}>Post</Text>
      </Pressable>
    </View>
  );
}
