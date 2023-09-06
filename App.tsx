import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Text, ImageURISource, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Main from "./routes/Main";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
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
import { PaperProvider } from "react-native-paper";

import { LoadingModal } from "./components/global/Modal/LoadingOverlay";
import { enableFreeze } from "react-native-screens";

import Animated, {
  BounceOutDown,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { useNetInfo } from "@react-native-community/netinfo";
import { openToast } from "./redux/slice/toast/toast";

import * as Sentry from "@sentry/react-native";
import socket from "./util/socket";
import { updateFollowing } from "./redux/slice/user/followers";
import { useGetFollowDetailsQuery } from "./redux/api/user";
import { SafeAreaProvider } from "react-native-safe-area-context";

enableFreeze(true);
Sentry.init({
  dsn: "https://a5db1485b6b50a45db57917521128254@o4505750037725184.ingest.sentry.io/4505750586195968",
  enabled: true,
});

const persistor = persistStore(store);
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <CustomToast />
          <LoadingModal />

          <Navigation />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
function AnimatedSplashScreen({
  children,
  image,
}: {
  children: ReactNode;
  image: ImageURISource;
}) {
  const [isAppReady, setAppReady] = useState(false);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);
  const dark = useGetMode();
  const backgroundColor = dark ? "black" : "white";
  const color = !dark ? "black" : "white";
  const style = dark ? "light" : "dark";
  return (
    <View style={{ flex: 1 }}>
      <StatusBar animated={true} style={style} backgroundColor="transparent" />
      {isAppReady && children}
      {!isAppReady && (
        <Animated.View
          exiting={FadeOut.duration(800)}
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            exiting={BounceOutDown.duration(400)}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
          <Animated.View
            entering={FadeIn.springify()}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color,
                fontFamily: "mulish",

                fontSize: 14,
              }}
            >
              Qui 🚀 beta
            </Text>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
}

const Navigation = () => {
  const dark = useGetMode();
  const dispatch = useAppDispatch();
  const style = dark ? "light" : "dark";
  useGetFollowDetailsQuery(null);
  const { route } = useAppSelector((state) => state.routes);
  const userAuthenticated = useAppSelector((state) => state.user.token);

  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.isConnected !== null) {
      if (!netInfo.isConnected) {
        dispatch(openToast({ text: "No Internet", type: "Failed" }));
      }
    }
  }, [netInfo]);

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
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AnimatedSplashScreen
      image={
        dark
          ? require("./assets/splash.png")
          : require("./assets/splash-lightmode.png")
      }
    >
      <NavigationContainer onReady={onLayoutRootView}>
        <StatusBar
          animated={true}
          style={style}
          backgroundColor="transparent"
        />
        {renderRoute()}
      </NavigationContainer>
    </AnimatedSplashScreen>
  );
};
