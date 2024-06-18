import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerRootStackParamList } from "../../types/navigation";
import useGetMode from "../../hooks/GetMode";
import CustomDrawerContent from "../../components/home/drawer/CustomDrawer";
import { useLazyGetFollowDetailsQuery } from "../../redux/api/user";
import { Dimensions, Platform } from "react-native";
import Home from "../../screen/App/Home";
import { BlurView } from "expo-blur";
import ProfileButton from "../../components/home/header/ProfileButton";
import { useAppSelector } from "../../redux/hooks/hooks";

const Drawer = createDrawerNavigator<DrawerRootStackParamList>();
const { width } = Dimensions.get("window");
export default function DrawerNavigator() {
  const dark = useGetMode();
  const isDark = dark;
  const tint = isDark ? "dark" : "light";

  const color = isDark ? "white" : "black";
  const borderColor = isDark ? "#FFFFFF7D" : "#4545452D";
  const backgroundColor = isDark ? "black" : "white";
  const isHighEndDevice = useAppSelector((state) => state.prefs?.isHighEnd);
  const [getCurrentFollowData] = useLazyGetFollowDetailsQuery();
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerStatusBarHeight: 30,

        drawerStyle: {
          backgroundColor: !isHighEndDevice ? backgroundColor : "transparent",
          width: width * 0.85,
        },
        sceneContainerStyle: { backgroundColor },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => {
          return {
            headerBackground: () => (
              <>
                {isHighEndDevice && (
                  <BlurView
                    experimentalBlurMethod="dimezisBlurView"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      top: 0,
                      right: 0,
                    }}
                    tint={tint}
                    intensity={200}
                  />
                )}
              </>
            ),

            drawerItemStyle: { display: "none" },
            headerTitleStyle: { fontFamily: "uberBold", fontSize: 20, color },
            headerShadowVisible: false,
            headerBackgroundContainerStyle: {
              borderBottomWidth: 0.2,
              borderColor,
              backgroundColor: !isHighEndDevice ? backgroundColor : undefined,
            },
            headerTransparent: true,
            headerTitleAlign: "center",
            headerLeft: () => (
              <ProfileButton
                color={color}
                style={{ paddingLeft: 20 }}
                size={40}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            ),
            headerStyle: {
              height:Platform.OS=="ios"? 100: undefined,
              backgroundColor: !isHighEndDevice
                ? backgroundColor
                : "transparent",
            },
            title: "Qui ",
          };
        }}
      />
    </Drawer.Navigator>
  );
}
