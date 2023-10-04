import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import useGetMode from "../../hooks/GetMode";
import { formatDateForChat } from "../../util/date";
import Lottie from "lottie-react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
} from "react-native-reanimated";
const { width } = Dimensions.get("window");
export default function TypingBox() {
  const dark = useGetMode();
  const backgroundColorForMe = dark ? "#35383A" : "#0c81f8";
  const backgroundColor = dark ? "#181B1D" : "#e8e8eb";
  const color = dark ? "white" : "black";
  const animationRef = useRef<Lottie>(null);

  useEffect(() => {
    animationRef.current?.play();

    return () => {
      animationRef.current?.reset();
    };
  }, []);
  return (
    <Animated.View
      entering={FadeInDown.springify()}
      exiting={FadeOutDown.springify()}
      style={{ width: "100%", alignItems: "flex-start" }}
    >
      <View>
        <View
          style={{
            padding: 10,
            borderRadius: 15,
            maxWidth: width / 1.5,
            borderBottomLeftRadius: 0,

            alignSelf: "flex-start",

            backgroundColor,
          }}
        >
          <View
            style={{
              height: 10,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Lottie
              style={{ width: 40, height: 50, zIndex: 0 }}
              ref={animationRef}
              source={
                dark
                  ? require("../../assets/lottie/isTyping-light.json")
                  : require("../../assets/lottie/isTyping-black.json")
              }
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
