import { Dimensions, Text, View } from "react-native";
import useGetMode from "../../../hooks/GetMode";

const { width } = Dimensions.get("window");
export const Skeleton = () => {
  const dark = useGetMode();
  const shimmerColors = dark
    ? ["#4C4C4C", "#696969", "#383838"]
    : ["#ebebeb", "#c5c5c5", "#ebebeb"];

  const backgroundColor = dark ? "#343434" : "#BBBBBB";
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <View
        style={{ width: 50, height: 50, backgroundColor, borderRadius: 9999 }}
      />
      <View style={{ gap: 10 }}>
        <View
          style={{
            width: width * 0.5,
            borderRadius: 10,
            height: 20,
            backgroundColor,
          }}
        />
        <View
          style={{
            width: width * 0.8,
            borderRadius: 10,
            height: 40,
            backgroundColor,
          }}
        />

        <View
          style={{
            width: width * 0.8,
            borderRadius: 10,
            height: 100,
            backgroundColor,
          }}
        />
      </View>
    </View>
  );
};
