import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {

  Dimensions,
  ImageURISource,
  StyleSheet,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Main, { BottomTabNavigator } from "./routes/Main";
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
import { PaperProvider, Portal } from "react-native-paper";
import { useGetUserQuery, useTokenValidQuery } from "./redux/api/user";
import { signOut } from "./redux/slice/user";
import { openToast } from "./redux/slice/toast/toast";
import { LoadingModal } from "./components/global/Modal/LoadingOverlay";
import Constants from "expo-constants";
import Animated, { BounceInDown, BounceOut, BounceOutDown, FadeIn, FadeInDown, FadeInUp, FadeOut } from "react-native-reanimated";

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

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isAppReady && (
        <Animated.View
        exiting={FadeOut.duration(400)}
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "black",
              
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
        </Animated.View>
      )}
    </View>
  );
}

const Navigation = () => {
  const dark = useGetMode();

  const style = dark ? "light" : "dark";
  const { route } = useAppSelector((state) => state.routes);
  const userAuthenticated = useAppSelector((state) => state.user.token);
  console.log(
    "🚀 ~ file: App.tsx:48 ~ Navigation ~ userAuthenticated:",
    userAuthenticated
  );

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
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AnimatedSplashScreen image={require("./assets/splash.png")}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
