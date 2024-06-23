import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  FadeInUp,
  FadeOutUp,
  runOnJS,
} from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { closeToast } from "../../../redux/slice/toast/toast";
import { BlurView } from "expo-blur";
import { ForbiddenIcon, InfoIcon, VerifyIcon } from "../../icons";
import useGetMode from "../../../hooks/GetMode";
import { Portal } from "react-native-paper";
import { useForm } from "react-hook-form";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

const width = Dimensions.get("window").width;
export default function CustomToast() {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const tint = dark ? "dark" : "light";
  const colorForbidden = dark ? "#ff0000" : "#400000";
  const dispatch = useAppDispatch();

  const toastState = useAppSelector((state) => state.toast);

  function handleClose() {
    dispatch(closeToast());
  }

  function callback() {
    "worklet";
    runOnJS(handleClose)();
  }

  const renderIcon = () => {
    if (toastState?.type === "Failed") {
      return <ForbiddenIcon size={20} color={colorForbidden} />;
    } else if (toastState?.type === "Success") {
      return <VerifyIcon size={20} color={"green"} />;
    } else if (toastState?.type === "Info") {
      return <InfoIcon size={20} color={color} />;
    } else if (toastState?.type === "Message") {
      return (
        <Image
          style={{ height: 20, width: 20, borderRadius: 999 }}
          source={{ uri: toastState?.imageUri }}
        />
      );
    }
  };
  const insets = useSafeAreaInsets();
  const isHighEndDevice = useAppSelector((state) => state?.prefs?.isHighEnd);
  return (
    <Portal>
      {toastState?.open && (
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("pressed");
          }}
        >
          <Animated.View
            style={{
              height: 60 + insets.top,
              width: width,
              backgroundColor:
                toastState?.type === "Failed"
                  ? "#D8000061"
                  : toastState?.type === "Success"
                  ? "#4CF10062"
                  : "#00000058",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            entering={FadeInUp.springify().withCallback(callback)}
            exiting={FadeOutUp.springify().delay(1000)}
          >
            <BlurView
              experimentalBlurMethod= {isHighEndDevice ?"dimezisBlurView": undefined}
              tint={tint}
              style={{ position: "absolute", width, height: 60 + insets.top }}
              intensity={50}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
                paddingBottom: 20,
              }}
            >
              {renderIcon()}
              <Text
                style={{
                  color,
                  fontFamily: "mulishMedium",
                  fontSize: 16,
                }}
              >
                {toastState.text}
              </Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </Portal>
  );
}
