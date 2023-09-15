import { useEffect, useRef } from "react";
import Lottie from "lottie-react-native";
import { View } from "react-native";
import { useAppSelector } from "../../../../redux/hooks/hooks";
import { Image } from "expo-image";



export default function RingAudio({
  animationRef,
}: {
  animationRef: React.RefObject<Lottie>;
}) {
  useEffect(() => {
    animationRef.current?.pause();
  }, []);
  const userImage = useAppSelector((state) => state.user.data?.imageUri);
  return (
    <View
      style={{
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 200,
          width: 200,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99,
          position: "absolute",
        }}
      >
        <Image
          style={{ borderRadius: 999, height: 80, width: 80 }}
          source={{ uri: userImage }}
        />
      </View>
      <Lottie
        style={{ width: 200, height: 200,position: "absolute",zIndex:0 }}
        ref={animationRef}
        source={require("../../../../assets/lottie/play.json")}
      />
    </View>
  );
}
