import { Dimensions, Text, View } from "react-native";
import useGetMode from "../../../hooks/GetMode";

const { width } = Dimensions.get("window");

export const PostSearchSkeleton = () => {
  const dark = useGetMode();
  const backgroundColor = dark ? "#343434" : "#BBBBBB";
  return (
    <View style={{ width: "100%" }}>
      <View style={{ width: "100%", height: 60, gap: 10 }}>
        <View
          style={{
            borderRadius: 20,
            width: "100%",
            backgroundColor,
            height: 60,
          }}
        />
      </View>
    </View>
  );
};
