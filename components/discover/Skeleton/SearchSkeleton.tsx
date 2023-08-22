import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

import { Dimensions, Text, View } from "react-native";
import useGetMode from "../../../hooks/GetMode";

const { width } = Dimensions.get("screen");

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
export const SearchSkeleton = () => {
  const dark = useGetMode();
  const shimmerColors = dark
    ? ["#4C4C4C", "#696969", "#383838"]
    : ["#ebebeb", "#c5c5c5", "#ebebeb"];
  return (
    <View style={{ width: "100%" }}>
      <View style={{ width: "100%", height: 60, gap: 10 }}>
        <ShimmerPlaceholder
          height={60}
          width={width - 20}
          shimmerColors={shimmerColors}
          style={{ borderRadius: 20 }}
        />
      </View>
    </View>
  );
};
