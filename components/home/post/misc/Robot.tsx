import { useEffect, useRef } from "react";
import Lottie from "lottie-react-native";
import { View } from "react-native";
import { useAppSelector } from "../../../../redux/hooks/hooks";
import { Image } from "expo-image";

export default function Robot() {
  const animationRef = useRef<Lottie>(null);

  useEffect(() => {
    animationRef.current?.play();
  
  }, []);
  return (
    <View
      style={{
        height: 80,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie
        style={{ width: 200, height: 200 }}
        loop={true}
        ref={animationRef}
        source={require("../../../../assets/lottie/robot.json")}
      />
    </View>
  );
}
