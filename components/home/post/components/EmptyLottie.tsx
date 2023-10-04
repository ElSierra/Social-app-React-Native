import { useEffect, useRef } from "react";
import Lottie from "lottie-react-native";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export default function EmptyLottie() {
  const lottieRef = useRef<Lottie>(null);

  useEffect(() => {
    lottieRef.current?.play();
    return () => lottieRef.current?.pause();
  }, []);

  return (
    <Lottie
      style={{ width: width / 1.5, height: width / 1.5 }}
      ref={lottieRef}
      source={require("../../../../assets/lottie/emptyList.json")}
    />
  );
}
