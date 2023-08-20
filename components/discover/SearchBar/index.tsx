import {
  View,
  Text,
  TextInput,
  StyleProp,
  ViewStyle,
  Dimensions,
} from "react-native";
import useGetMode from "../../../hooks/GetMode";
import Animated, { FadeInRight } from "react-native-reanimated";

const { width } = Dimensions.get("screen");
export default function SearchBar() {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const placeholderColor = !dark ? "grey" : "grey";
  const borderColor = dark ? "#FFFFFF" : "#DAD9D9";
  const backgroundColor = dark ? "#383838" : "#eff3f4";

  return (
    <Animated.View
      entering={FadeInRight.springify()}
      style={[
        {
          width: width * 0.7,
          height: 40,
          borderColor: borderColor,
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
          backgroundColor,
        },
      ]}
    >
      <TextInput
        cursorColor={color}
        placeholder="Search Qui"
        placeholderTextColor={placeholderColor}
        style={{
          width: "100%",
          fontSize: 16,
          color,

          fontFamily: "jakara",
          includeFontPadding: false,
        }}
      />
    </Animated.View>
  );
}
