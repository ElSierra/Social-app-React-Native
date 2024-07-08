import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { AVPlaybackStatus, Audio } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";
import Lottie from "lottie-react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";

import IconButton from "../../../global/Buttons/IconButton";
import { PlayIcon } from "../../../icons";
import AudioPlayLottie from "./AudioPlayLottie";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { useFocusEffect } from "@react-navigation/native";

export default function AudioPost({
  uri,
  idx,
  photoUri,
}: {
  uri: string;
  photoUri: string;
  idx: number;
}) {
  const visibleIds = useAppSelector((state) => state.audio?.playingId);
  console.log("🚀 ~ file: AudioPost.tsx:29 ~ visibleIds:", visibleIds);

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const animationRef = useRef<Lottie>(null);
  const [status, setStatus] = useState<any>(null);

  const opacity = useSharedValue(1);
  const opacityPic = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacity.value, [0, 1], [0, 1]),
  }));

  const picAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacityPic.value, [0, 1], [0, 1]),
  }));

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound, status } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
        setStatus(status);
      } catch (e) {
        console.error("Error loading sound", e);
      }
    };
    loadSound();

    return () => {
      if (sound) {
        sound
          .unloadAsync()
          .catch((e) => console.error("Error unloading sound", e));
      }
    };
  }, []);

  useEffect(() => {
    if (!visibleIds?.includes(idx)) {
      sound?.pauseAsync().then((r) => {
        console.log("dodneddn");
      });
    }
  }, [visibleIds]);
  useEffect(() => {
    if (!sound) return;

    const updateStatus = (status: any) => {
      setStatus(status);
      if (status?.isPlaying) {
        opacity.value = withTiming(0, { duration: 400 });
        opacityPic.value = withTiming(1, { duration: 400 });
      } else {
        opacity.value = withTiming(1, { duration: 400 });
        opacityPic.value = withTiming(0, { duration: 400 });
      }
    };

    sound.setOnPlaybackStatusUpdate(updateStatus);

    return () => {
      sound.setOnPlaybackStatusUpdate(null);
    };
  }, [sound]);

  const handlePlayPause = async () => {
    if (!sound) return;

    try {
      if (status?.isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (e) {
      console.error("Error playing/pausing sound", e);
    }
  };

  useEffect(() => {
    if (status?.isPlaying) {
      animationRef.current?.play();
    } else {
      animationRef.current?.pause();
    }
  }, [status?.isPlaying]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        const stop = async () => {
          try {
            await sound?.pauseAsync();
          } catch (e) {}
        };
        stop();
      };
    }, [])
  );

  return (
    <View style={{ height: 200, width: "100%" }}>
      <Pressable style={{ flex: 1 }} onPress={handlePlayPause}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ height: 200, width: 200 }}>
            <AudioPlayLottie animationRef={animationRef} src={photoUri} />
            <Animated.View
              style={[
                {
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 999,
                  bottom: 0,
                },
                animatedStyle,
              ]}
            >
              <IconButton
                Icon={<PlayIcon size={60} color="white" />}
                onPress={handlePlayPause}
              />
            </Animated.View>
            <Animated.View
              style={[
                {
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 999,
                  bottom: 0,
                },
                picAnimatedStyle,
              ]}
            >
              <Image
                source={{ uri: photoUri }}
                style={{ width: 80, height: 80, borderRadius: 9999 }}
              />
            </Animated.View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
