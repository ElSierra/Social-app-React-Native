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
import {
  DrawerHeaderProps,
  DrawerProps,
} from "@react-navigation/drawer/lib/typescript/src/types";
import useGetMode from "../../../hooks/GetMode";
import { useAppSelector } from "../../../redux/hooks/hooks";
function CustomDrawerHeader(props: DrawerHeaderProps) {
  const navigation = useNavigation<HomeNavigationProp>();
  const dark = useGetMode();
  const isDark = dark;
  const TextColor = isDark ? "white" : "black";
  const isHighEndDevice = useAppSelector((state) => state?.prefs?.isHighEnd);
  return (
    <SafeAreaView>
      <BlurView
        experimentalBlurMethod= {isHighEndDevice ?"dimezisBlurView": undefined}
        style={[
          style.blurView,
          { borderBlockColor: isDark ? "#0000002F" : "#FFFFFF30" },
        ]}
        tint={isDark ? "dark" : "light"}
        intensity={200}
      >
        <View style={style.titleView}>
          <View style={{ width: "33.3%", alignItems: "flex-start" }}>
            <ProfileButton
              onPress={() => props.navigation.toggleDrawer()}
              size={45}
              color={isDark ? "white" : "black"}
            />
          </View>

          <View style={{ width: "33.3%", alignItems: "center" }}>
            <Text style={[style.headerStyle, { color: TextColor }]}>
              {props.options.title}
            </Text>
          </View>
          <View style={{ width: "33.3%" }} />
        </View>
      </BlurView>
    </SafeAreaView>
  );
}

export default React.memo(CustomDrawerHeader);
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
