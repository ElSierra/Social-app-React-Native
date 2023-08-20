import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

import { Dimensions, Text, View } from "react-native";
import useGetMode from "../../../hooks/GetMode";

const { width } = Dimensions.get("screen");

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
export const Skeleton = () => {
const dark = useGetMode()
const shimmerColors = dark ?['#4C4C4C', '#696969', '#383838'] : ['#ebebeb', '#c5c5c5', '#ebebeb']
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <ShimmerPlaceholder
        height={50}
        shimmerColors={shimmerColors}
        width={50}
        style={{ borderRadius: 9999 }}
      />
      <View style={{width:width * 0.78,height:200, gap:10} }>
        <ShimmerPlaceholder height={20} width={width * 0.5} shimmerColors={shimmerColors}/>
        <ShimmerPlaceholder height={20} width={width * 0.78}  shimmerColors={shimmerColors} />
        <ShimmerPlaceholder height={"100%"} width={width * 0.78}  style={{ borderRadius: 10 }}  shimmerColors={shimmerColors}/>
      </View>
    </View>
  );
};
