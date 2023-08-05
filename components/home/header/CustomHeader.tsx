import { BlurView } from "expo-blur";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileButton from "./ProfileButton";
import React from "react";
import { HomeNavigationProp } from "../../../types/navigation";
import Animated from "react-native-reanimated";
function CustomHeader({ title }: { title: string }) {
  const navigation = useNavigation<HomeNavigationProp>();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const TextColor = isDark ? "white" : "black";
  return (
    <SafeAreaView>
      <BlurView
        style={[
          style.blurView,
          { borderBlockColor: isDark ? "#0000002F" : "#FFFFFF30" },
        ]}
        tint={isDark ? "dark" : "light"}
        intensity={70}
      >
        <View style={style.titleView}>
          <Animated.View
            sharedTransitionTag="ppic"
            style={{ width: "33.3%", alignItems: "flex-start" }}
          >
            {title !== "Home" ? null : (
              <ProfileButton
                onPress={() => navigation.navigate("Profile")}
                size={45}
                color={isDark ? "white" : "black"}
              />
            )}
          </Animated.View>

          <View style={{ width: "33.3%", alignItems: "center" }}>
            <Text style={[style.headerStyle, { color: TextColor }]}>
              {title}
            </Text>
          </View>
          <View style={{ width: "33.3%" }} />
        </View>
      </BlurView>
    </SafeAreaView>
  );
}

export default React.memo(CustomHeader);
const style = StyleSheet.create({
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 90,
    paddingHorizontal: 10,
    borderBlockColor: "#0000002F",
    borderBottomWidth: 0.5,
    right: 0,
    alignItems: "center",
  },
  titleView: {
    paddingTop: 44,
    paddingBottom: 10,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerStyle: {
    fontFamily: "instaBold",
    fontSize: 20,
  },
});
