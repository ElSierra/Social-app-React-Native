import { useEffect, useRef } from "react";
import Lottie from "lottie-react-native";

export default function EmptyLottie() {
  const lottieRef = useRef<Lottie>(null);

  useEffect(() => {
    lottieRef.current?.play();
    return () => lottieRef.current?.pause();
  }, []);

  return (
    <Lottie
      style={{ width: 200, height: 200 }}
      ref={lottieRef}
      source={require("../../../../assets/lottie/emptyList.json")}
    />
  );
}
