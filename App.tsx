import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Main, { BottomTabNavigator } from "./routes/Main";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    instaBold: require("./assets/fonts/Instagram.ttf"),
    jakaraBold: require("./assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    jakara: require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <StatusBar animated={true} style="dark" backgroundColor="transparent" />
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
