import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

import { Dimensions, Text, View } from "react-native";

const { width } = Dimensions.get("screen");

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
export const Skeleton = () => {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <ShimmerPlaceholder
        height={60}
        width={60}
        style={{ borderRadius: 9999 }}
      />
      <View style={{width:width * 0.78,height:200, gap:10}}>
        <ShimmerPlaceholder height={20} width={width * 0.5} />
        <ShimmerPlaceholder height={20} width={width * 0.78} />
        <ShimmerPlaceholder height={"100%"} width={width * 0.78}  style={{ borderRadius: 10 }}/>
      </View>
    </View>
  );
};
