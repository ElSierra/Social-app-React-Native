import { Dimensions, Text, View } from "react-native";
import useGetMode from "../../../hooks/GetMode";

const { width } = Dimensions.get("window");

export const SearchSkeleton = () => {
  const dark = useGetMode();
  const shimmerColors = dark
    ? ["#4C4C4C", "#696969", "#383838"]
    : ["#ebebeb", "#c5c5c5", "#ebebeb"];
  const backgroundColor = dark ? "#343434" : "#BBBBBB";
  return (
    <View style={{ width: "100%" }}>
      <View style={{ width: "100%", height: 40, gap: 10 }}>
        <View
          style={{
            borderRadius: 20,
            width: "100%",
            backgroundColor,
            height: 40,
          }}
        />
      </View>
    </View>
  );
};
