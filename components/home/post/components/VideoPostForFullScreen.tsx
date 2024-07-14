import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { PauseIcon, PlayIcon, ProfileIcon } from "../../../icons";

import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useFocusEffect } from "@react-navigation/native";
import useGetMode from "../../../../hooks/GetMode";

import Slider from "@react-native-community/slider";
import convertMsToHMS from "../../../../util/convert";
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");
export default function VideoPostFullScreen({
  videoTitle,

  videoUri,
  thumbNail,
  imageUri,
  name,
  userTag,
}: {
  videoTitle?: string;
  imageUri: string;
  name: string;
  userTag: string;
  videoUri: string;
  thumbNail: string | null;

  videoViews?: string;
}) {
  const video = useRef<null | Video>(null);

  const [status, setStatus] = useState<any>(null);

  const [play, setPlay] = useState(true);
  const [overlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeVideo = async () => {
      try {
        await video.current?.setIsLoopingAsync(true);
      } catch (error) {
        console.error("Failed to set looping:", error);
      }
    };
    initializeVideo();

    return () => {
      if (video.current) {
        video.current
          .unloadAsync()
          .catch((e) => console.error("Failed to unload video:", e));
      }
    };
  }, []);

  useEffect(() => {
    setIsLoading(status?.positionMillis === status?.playableDurationMillis);
  }, [status?.positionMillis, status?.playableDurationMillis]);

  const handlePlay = () => {
    setPlay((prev) => !prev);
    setShowOverlay((prev) => !prev);
  };

  const handleOverlayDelay = useCallback(() => {
    setTimeout(() => {
      setShowOverlay(false);
    }, 10000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setPlay(false);
      };
    }, [])
  );

  const renderPlayPause = () => {
    if (!play && overlay) {
      return (
        <Animated.View
          entering={FadeIn.springify()}
          exiting={FadeOut.springify()}
          style={{
            width: "100%",
            height: "100%",

            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 999,
            pointerEvents: "box-none",
          }}
        >
          <Pressable onPress={handlePlay}>
            <PlayIcon size={80} color="white" />
          </Pressable>
        </Animated.View>
      );
    }
    if (play && overlay) {
      return (
        <Animated.View
          entering={FadeIn.springify()}
          exiting={FadeOut.springify()}
          style={{
            width: "100%",
            height: "100%",

            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 999,
            pointerEvents: "box-none",
          }}
        >
          <Pressable onPress={handlePlay}>
            <PauseIcon size={80} color="white" />
          </Pressable>
        </Animated.View>
      );
    }
  };

  function callback() {
    "worklet";
    runOnJS(handleOverlayDelay)();
  }

  const scaleContext = useSharedValue(1);
  const scale = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateContext = useSharedValue({ x: 0, y: 0 });
  const animImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateX: translateX.value }, { translateY: translateY.value }]
    };
  });
  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      scaleContext.value = scale.value - 1;
    })

    .onUpdate((event) => {
      console.log(
        "🚀 ~ file: index.tsx:47 ~ App ~ event:",
        event,
        scaleContext.value
      );
      if (scaleContext.value + event.scale < 0.5) return;
      if (scaleContext.value + event.scale > 4) return;
      scale.value = scaleContext.value + event.scale;
    })
    .onEnd((e) => {});


  const panGesture = Gesture.Pan()
  .onBegin((event) => {
    translateContext.value = { x: translateX.value, y: translateY.value };
  })
  .onUpdate((event) => {
    console.log(
      "x y",
      translateContext.value.x + event.translationX,
      translateContext.value.y + event.translationY
    );

    translateX.value = translateContext.value.x + event.translationX / 4;
    translateY.value = translateContext.value.y + event.translationY / 4;
    console.log("🚀 ~ file: index.tsx:pan ~ App ~ event:", event);
  });
const composed = Gesture.Simultaneous(pinchGesture, panGesture);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View>
        <ImageBackground
          source={{ uri: thumbNail ? thumbNail : videoUri }}
          blurRadius={80}
          imageStyle={{ opacity: 0.5 }}
          contentFit="cover"
          style={{ height: "100%", width: "100%", justifyContent: "center" }}
        ></ImageBackground>
      </View>
      {
        <GestureDetector gesture={composed}>
          <Animated.View
            style={[
              { height: "100%", width: "100%", position: "absolute" },
              animImageStyle,
            ]}
          >
            <TouchableWithoutFeedback
              style={{ flex: 1, width: "100%" }}
              onPress={() => {
                setShowOverlay(true);
              }}
            >
              <Video
                ref={video}
                style={{ flex: 1, width: "100%", borderRadius: 10 }}
                source={{
                  uri: videoUri,
                }}
                useNativeControls={false}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay={play}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </TouchableWithoutFeedback>
          </Animated.View>
        </GestureDetector>
      }

      {overlay && (
        <TouchableWithoutFeedback
          onPress={() => {
            setShowOverlay(!overlay);
          }}
        >
          <Animated.View
            entering={FadeInDown.springify().withCallback(() =>
              runOnJS(handleOverlayDelay)()
            )}
            exiting={FadeOutDown.springify()}
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              paddingBottom: 50,
              justifyContent: "flex-end",
              backgroundColor: "#00000062",
              height: height + 100,
              padding: 20,
            }}
          >
            <View style={{ width: "100%", height: 30 }}>
              <Slider
                style={{ width: "100%" }}
                minimumValue={0}
                thumbTintColor="transparent"
                upperLimit={status?.durationMillis}
                disabled={status === null || status.loaded === false}
                value={status?.playableDurationMillis}
                maximumValue={status?.durationMillis}
                minimumTrackTintColor="#C1C0C0"
                maximumTrackTintColor={"#D3D3D3"}
              />
              <Slider
                style={{ width: "100%", position: "absolute" }}
                minimumValue={0}
                thumbTintColor="white"
                upperLimit={status?.durationMillis}
                disabled={status === null || status.loaded === false}
                value={status?.positionMillis}
                maximumValue={status?.durationMillis}
                onValueChange={(position: number) => {
                  video.current?.setPositionAsync(position);
                }}
                minimumTrackTintColor="#FFFEFE"
                maximumTrackTintColor={"#FFFFFF"}
              />
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
                paddingHorizontal: 12,
              }}
            >
              <Text
                style={{ color: "white", fontFamily: "jakara", fontSize: 14 }}
              >
                {convertMsToHMS(status?.positionMillis || 0)} /{" "}
                {convertMsToHMS(status?.durationMillis || 0)}
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{ height: 40, width: 40, borderRadius: 10 }}
                />
              ) : (
                <ProfileIcon size={45} color={"white"} />
              )}
              <View style={{ justifyContent: "space-between" }}>
                <Text
                  style={{
                    fontFamily: "mulishBold",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  {name}
                </Text>
                <Text style={{ fontFamily: "mulish", color: "white" }}>
                  @{userTag}
                </Text>
              </View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
      {isLoading && (
        <View
          style={{
            position: "absolute",
            zIndex: 999,
            justifyContent: "center",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={50} color={"white"} />
        </View>
      )}
      {renderPlayPause()}
    </View>
  );
}
