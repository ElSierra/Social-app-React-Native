import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Main, { BottomTabNavigator } from "./routes/Main";
import { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import OnboardNavigation from "./routes/OnBoard";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import Auth from "./routes/Auth";
import { FadeInView } from "./components/global/AnimatedScreen/FadeInView";
import useGetMode from "./hooks/GetMode";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import CustomToast from "./components/global/Toast";
import { PaperProvider, Portal } from "react-native-paper";
import { useGetUserQuery, useTokenValidQuery } from "./redux/api/user";
import { signOut } from "./redux/slice/user";

const persistor = persistStore(store);
SplashScreen.preventAutoHideAsync();
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <CustomToast />
          <Navigation />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const Navigation = () => {
  const dark = useGetMode();
  const [wait, setWaiting] = useState(false);
  const [skip, setSkip] = useState(true);

  const style = dark ? "light" : "dark";
  const { route } = useAppSelector((state) => state.routes);
  const userAuthenticated = useAppSelector((state) => state.user.token);
  console.log(
    "🚀 ~ file: App.tsx:48 ~ Navigation ~ userAuthenticated:",
    userAuthenticated
  );
  const dispatch = useAppDispatch();
  const validUser = useTokenValidQuery(undefined, { skip });
  console.log("🚀 ~ file: App.tsx:49 ~ Navigation ~ validUser:", validUser);

  useEffect(() => {
    if (userAuthenticated) {
      setSkip(false);
    }
  }, []);
  useEffect(() => {
    if (validUser.isFetching) {
      setWaiting(true);
    }
    if (validUser.isSuccess) {
      console.log("reeached");
      setWaiting(false);
      if (!validUser.data?.msg) {
        dispatch(signOut());
      }
    }
  }, [validUser.isFetching]);
  console.log(
    "🚀 ~ file: App.tsx:45 ~ Navigation ~ userAuthenticated:",
    userAuthenticated
  );
  const [fontsLoaded] = useFonts({
    mulish: require("./assets/fonts/Mulish-Light.ttf"),
    mulishBold: require("./assets/fonts/Mulish-Black.ttf"),
    mulishMedium: require("./assets/fonts/Mulish-Medium.ttf"),
    uberBold: require("./assets/fonts/UberMove-Bold.ttf"),
    instaBold: require("./assets/fonts/Instagram.ttf"),
    jakaraBold: require("./assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    jakara: require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
  });

  const renderRoute = () => {
    if (route === "onBoard") {
      return <OnboardNavigation />;
    } else if (userAuthenticated) {
      return (
        <FadeInView style={{ flex: 1 }}>
          <Main />
        </FadeInView>
      );
    } else if (route === "Auth" || !userAuthenticated) {
      return (
        <FadeInView style={{ flex: 1 }}>
          <Auth />
        </FadeInView>
      );
    }
  };
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !wait) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, wait]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <StatusBar animated={true} style={style} backgroundColor="transparent" />
      {renderRoute()}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
