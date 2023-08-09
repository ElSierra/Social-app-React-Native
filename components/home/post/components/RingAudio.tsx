import { useEffect, useRef } from "react";
import Lottie from "lottie-react-native";

export default function RingAudio({
  animationRef,
}: {
  animationRef: React.RefObject<Lottie>;
}) {

  useEffect(() => {
    animationRef.current?.pause();
  }, []);

  return (
    <Lottie
      style={{ width: 200, height: 200 }}
      ref={animationRef}
      source={require("../../../../assets/lottie/play.json")}
    />
  );
}
