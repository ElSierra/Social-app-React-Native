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
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image, ImageBackground } from "expo-image";
import { useFocusEffect } from "@react-navigation/native";
import useGetMode from "../../../../hooks/GetMode";

import Slider from "@react-native-community/slider";
import convertMsToHMS from "../../../../util/convert";
import { StatusBar } from "expo-status-bar";


const {height} = Dimensions.get("screen")
export default function VideoPostFullScreen({
  videoTitle,

  videoUri,

  imageUri,
  name,
  userTag,
}: {
  videoTitle?: string;
  imageUri: string;
  name: string;
  userTag: string;
  videoUri: string;

  videoViews?: string;
}) {
  const video = useRef<null | Video>(null);
 
  const [status, setStatus] = useState<any>(null);

  const [play, setPlay] = useState(true);
  const [overlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    video.current?.setIsLoopingAsync(true).catch((e) => {});
  }, []);

  useMemo(() => {
    if (status?.positionMillis === status?.playableDurationMillis) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status?.positionMillis, status?.playableDurationMillis]);
  const handlePlay = () => {
    setPlay(!play);
    setShowOverlay(!overlay);
  };

  const handleOverlayDelay = () => {
    setTimeout(() => {
      setShowOverlay(false);
    }, 10000);
  };

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
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={{ uri: videoUri }}
        blurRadius={20}
        contentFit="cover"
        imageStyle={{ opacity: 0.5 }}
        style={{ height: "100%", width: "100%", justifyContent: "center" }}
      >
        {
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
        }
      </ImageBackground>

      {overlay && (
        <TouchableWithoutFeedback
          onPress={() => {
            setShowOverlay(!overlay);
          }}
        >
          <Animated.View
            entering={FadeInDown.springify().withCallback(callback)}
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
                thumbImage={require("../../../../assets/images/seek.png")}
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
                thumbImage={require("../../../../assets/images/seek.png")}
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
                {convertMsToHMS(status?.positionMillis)} /{" "}
                {convertMsToHMS(status?.durationMillis)}
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {imageUri ? (
                <Image
                  source={imageUri}
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
