import "react-native-gesture-handler";
import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  ImageURISource,
  StyleSheet,
  View,
  AppState,
  useColorScheme,
  Platform,
} from "react-native";
import * as Linking from "expo-linking";

import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Main from "./routes/Main";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { SystemBars } from "react-native-edge-to-edge";
import Animated, {
  BounceOutDown,
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useNetInfo } from "@react-native-community/netinfo";
import { openToast } from "./redux/slice/toast/toast";

import * as Sentry from "@sentry/react-native";
import { useGetFollowDetailsQuery } from "./redux/api/user";
import * as Device from "expo-device";
import * as NavigationBar from "expo-navigation-bar";
import Notifications from "./util/notification";
import { PixelRatio } from "react-native";
import DeviceInfo from "react-native-device-info";
import { setHighEnd } from "./redux/slice/prefs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SystemNavigationBar from "react-native-system-navigation-bar";

enableFreeze(true);
Sentry.init({
  dsn: "https://a5db1485b6b50a45db57917521128254@o4505750037725184.ingest.sentry.io/4505750586195968",
  enabled: true,
});

const persistor = persistStore(store);
SplashScreen.preventAutoHideAsync();
SystemNavigationBar.setNavigationColor("transparent");
SystemNavigationBar.setNavigationBarContrastEnforced(true);
export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("🚀😒🚀", notification.request.content.data);
      }
    );
    const subscriptionResponse =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response", response.actionIdentifier);
        console.log(
          "🚀 ~ file: App.tsx:81 ~ Notifications.addNotificationResponseReceivedListener ~ response:"
        );
        if (response.actionIdentifier === "message") {
          const userText = response.userText;
          console.log(
            "🚀✅✅ ~ file: App.tsx:83 ~ Notifications.addNotificationResponseReceivedListener ~ userText:",
            userText
          );
        }
      });

    Notifications.getNotificationCategoriesAsync().then((e) => {
      console.log(e[0]);
    });
    return () => {
      subscription.remove();
      subscriptionResponse.remove();
    };
  }, []);
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
function AnimatedSplashScreen({ children }: { children: ReactNode }) {
  const isAnimationCompleteForQui = useSharedValue(false);
  const isAllAnimationComplete = useSharedValue(false);
  const [isAppReady, setAppReady] = useState(false);

  const onImageLoaded = useCallback(async () => {
    setTimeout(async () => {
      try {
        await SplashScreen.hideAsync();
        // Load stuff
        await Promise.all([]);
      } catch (e) {
        // handle errors
      } finally {
        setAppReady(true);
      }
    }, 2000);
  }, []);
  const dark = useGetMode();
  const backgroundColor = dark ? "black" : "white";
  const color = !dark ? "black" : "white";
  const style = dark ? "light" : "dark";

  const offset = useSharedValue(0);
  const opacityK = useSharedValue(0);
  const offsetK = useSharedValue(0);
  const backgroundColorOffset = useSharedValue("black");
  const colorSwitch = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
      ],
    };
  });

  useAnimatedReaction(
    () => {},
    () => {
      offset.value = withSpring(
        -38,

        {
          duration: 400,
        },
        () => {
          isAnimationCompleteForQui.value = true;
        }
      );
    }
  );
  const animatedStylesK = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacityK.value),
      transform: [
        {
          translateX: withTiming(
            offsetK.value,

            {},
            () => {
              isAllAnimationComplete.value = true;
            }
          ),
        },
      ],
    };
  });
  const animateBackgroundEntryStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorSwitch.value,
        [0, 1],
        ["black", backgroundColor]
      ),
    };
  });
  useEffect(() => {
    offset.value = -40;
    colorSwitch.value = withTiming(1, {
      duration: 400,
    });
  }, [backgroundColor]);

  function callback() {
    "worklet";
    runOnJS(onImageLoaded)();
  }

  useAnimatedReaction(
    () => {
      return isAnimationCompleteForQui.value;
    },
    (result) => {
      if (result) {
        opacityK.value = 1;
        offsetK.value = -40;
      }
    }
  );
  useAnimatedReaction(
    () => {
      return isAllAnimationComplete.value;
    },
    (result) => {
      if (result) {
        callback();
      }
    }
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar animated={true} style={style} backgroundColor="transparent" />
      {isAppReady && children}
      {!isAppReady && (
        <Animated.View
          exiting={FadeOut.duration(800)}
          pointerEvents="none"
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
            animateBackgroundEntryStyle,
          ]}
        >
          {/* <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            exiting={BounceOutDown.duration(400)}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          /> */}
          <Animated.View
            exiting={BounceOutDown.duration(800)}
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",

              alignItems: "center",
              width: "100%",
              aspectRatio: 1278 / 2278,
              flexDirection: "row",
            }}
          >
            <Animated.Text
              style={[
                {
                  fontFamily: "uberBold",
                  fontSize: 110,
                  paddingLeft: 60,
                  textAlign: "center",
                  color,
                },
                animatedStyles,
              ]}
            >
              Q
            </Animated.Text>
            <Animated.Text
              style={[
                {
                  fontFamily: "uberBold",
                  fontSize: 110,
                  color,
                  textAlign: "center",
                },
                animatedStylesK,
              ]}
            >
              ui
            </Animated.Text>
          </Animated.View>
          <Animated.View
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
              🌐 www.isaacojo.me
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
  console.log(
    "🚀 ~ file: App.tsx:330 ~ Navigation ~ userAuthenticated:",
    userAuthenticated
  );

  const netInfo = useNetInfo();

  const barColor = !dark ? "black" : "white";
  useEffect(() => {
    const navBehavior = async () => {
      Platform.OS === "ios"
        ? null
        : await NavigationBar.setBackgroundColorAsync(barColor);
    };
    navBehavior();
  }, [NavigationBar]);

  useEffect(() => {
    if (netInfo.isConnected !== null) {
      if (!netInfo.isConnected) {
        dispatch(openToast({ text: "No Internet", type: "Failed" }));
      }
    }
  }, [netInfo]);

  useEffect(() => {
    Device.deviceYearClass;
    console.log(
      "🚀 ~ file: App.tsx:351 ~ useEffect ~ Device:",
      Device.modelName
    );
    const getRam = DeviceInfo.getTotalMemorySync();
    console.log("🚀 ~ file: App.tsx:351 ~ useEffect ~ getRam:", getRam);
    const isHighEnd =
      (DeviceInfo.getApiLevelSync() >= 33 && getRam >= 6_442_450_944) ||
      Platform.OS === "ios";
    console.log("🚀 ~ file: App.tsx:446 ~ useEffect ~ isHighEnd:", isHighEnd);

    dispatch(setHighEnd({ isHighEnd }));
  }, []);

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

  const linking = {
    prefixes: ["https://qui.ojoisaac.me", "qui-ojo://"],
    config: {
      screens: {
        Main: "/",
        ChatScreen: "messages/:chatId",
        ViewPost: "posts/:postId",
      },
    },
    async getInitialURL() {
      // First, you may want to do the default deep link handling
      // Check if app was opened from a deep link
      const url = await Linking.getInitialURL();
      console.log("🚀 ~ file: App.tsx:277 ~ getInitialURL ~ url:", url);

      if (url != null) {
        return url;
      }

      // Handle URL from expo push notifications
      const response = await Notifications.getLastNotificationResponseAsync();
      console.log(
        "🚀 ~ file: App.tsx:285 ~ getInitialURL ~ response:",
        response?.notification.request.content.data
      );

      return response?.notification.request.content.data.url;
    },
    subscribe(listener: any) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);

      // Listen to incoming links from deep linking
      const eventListenerSubscription = Linking.addEventListener(
        "url",
        onReceiveURL
      );

      // Listen to expo push notifications
      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const url = response.notification.request.content.data.url;

          // Any custom logic to see whether the URL needs to be handled
          //...

          // Let React Navigation handle the URL
          listener(url);
        });

      return () => {
        // Clean up the event listeners

        eventListenerSubscription.remove();
        subscription.remove();
      };
    },
  };

  return (
    <NavigationContainer onReady={onLayoutRootView} linking={linking}>
      <SystemBars style={style} />
      <AnimatedSplashScreen>
        <StatusBar
          animated={true}
          style={style}
          backgroundColor="transparent"
        />
        <GestureHandlerRootView
          style={{ flex: 1, backgroundColor: dark ? "black" : "white" }}
        >
          {renderRoute()}
        </GestureHandlerRootView>
      </AnimatedSplashScreen>
    </NavigationContainer>
  );
};
