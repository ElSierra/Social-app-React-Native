import { View, Text, Dimensions, useColorScheme } from "react-native";
import { Image } from "expo-image";
import Animated, { FadeInLeft } from "react-native-reanimated";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
export default function OnboardBuilder({
  header,
  subText,
  imageUri,
}: {
  header: string;
  subText: string;
  imageUri: string;
}) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const color = !isDark ? "black" : "white";
  const backgroundColor = isDark ? "white" : "black";
  return (
    <View style={{ width }}>
      <Animated.View
        entering={FadeInLeft.delay(200)}
        style={{
          width: width * 0.9,
          justifyContent: "center",
          height: height / 2,
        }}
      >
        <Image style={{ flex: 1 }} contentFit="contain" source={imageUri} />
      </Animated.View>
      <Text style={{ fontFamily: "mulishBold", fontSize: 36, width: 300,color }}>
        {header}
      </Text>
      <Text style={{ fontSize: 26, fontFamily: "mulish", color: "#929292" }}>
        {subText}
      </Text>
    </View>
  );
}
