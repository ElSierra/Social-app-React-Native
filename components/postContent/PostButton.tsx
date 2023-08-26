import { View, Text, Pressable } from "react-native";
import React from "react";
import useGetMode from "../../hooks/GetMode";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { openToast } from "../../redux/slice/toast/toast";
import { resetPost } from "../../redux/slice/post";

export default function PostButton({
  isLoading,
  isDisabled,
  onPress,
}: {
  isLoading: boolean;
  isDisabled?: boolean;
  onPress: () => void;
}) {
  const dark = useGetMode();
  const dispatch = useAppDispatch();

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
        borderRadius: 9999,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Pressable
        disabled={isLoading || isDisabled}
        onPress={() => {
          dispatch(resetPost());
          onPress();
        }}
        android_ripple={{ color: rippleColor, foreground: true }}
        style={{
          height: 45,
          width: 80,

          borderRadius: 9999,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color, fontFamily: "mulishBold" }}>Post</Text>
      </Pressable>
    </View>
  );
}
