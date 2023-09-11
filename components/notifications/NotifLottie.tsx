import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react-native";

export default function NotifLottie() {
  const animationRef = useRef<Lottie>(null);
  useEffect(() => {
    animationRef.current?.play();
  }, []);
  return (
    <View
      style={{
        width: "100%",
        height: "50%",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        ref={animationRef}
        source={require("../../assets/lottie/notification.json")}
      />
    </View>
  );
}
