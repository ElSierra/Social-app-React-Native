import * as React from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { AVPlaybackStatus, Audio } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";

import useGetMode from "../../../../hooks/GetMode";
import RingAudio from "./RingAudio";
import IconButton from "../../../global/Buttons/IconButton";
import { PlayIcon } from "../../../icons";
import { BlurView } from "expo-blur";
import Lottie from "lottie-react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import AudioPlayLottie from "./AudioPlayLottie";
import { Image } from "expo-image";

export default function AudioPost({
  uri,
  photoUri,
}: {
  uri: string;
  photoUri: string;
}) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const animationRef = useRef<Lottie>(null);
  const [status, setStatus] = useState<any>(null);

  const opacity = useSharedValue(1);
  const opacityPic = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 1], [0, 1]), // map opacity value to range between 0 and 1
    };
  });
  const picAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacityPic.value, [0, 1], [0, 1]), // map opacity value to range between 0 and 1
    };
  });
  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound, status } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
        setStatus(status);
      } catch (e) {}
    };
    loadSound();

    return ()=>{
      sound?._clearSubscriptions()
    }
  }, []);
  useEffect(() => {
    sound?.setOnPlaybackStatusUpdate((status) => setStatus(status));
    if (status?.isPlaying) {
      opacity.value = withTiming(0, { duration: 400 });
      opacityPic.value = withTiming(1, { duration: 400 });
    } else {
      opacity.value = withTiming(1, { duration: 400 });
      opacityPic.value = withTiming(0, { duration: 400 });
    }
  }, [status]);

  async function playSound() {
    if (sound === null) {
      return;
    }
    try {
      await sound.playAsync();
    } catch (e) {}
  }
  async function pauseSound() {
    if (sound === null) {
      return;
    }
    try {
      await sound.pauseAsync();
    } catch (e) {}
  }

  React.useEffect(() => {
    return sound
      ? () => {
      
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (status?.isPlaying) {
      animationRef.current?.play();
      return;
    }
    animationRef.current?.pause();
  }, [status?.isPlaying]);

  return (
    <View style={{ height: 200, width: "100%" }}>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          if (!status && !status?.isLoaded) {
            return;
          }
          if (status?.isPlaying) {
            pauseSound();

            return;
          }

          playSound();
        }}
      >
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
                onPress={() => {
                  if (!status && !status?.isLoaded) {
                    return;
                  }
                  if (status?.isPlaying) {
                    pauseSound();

                    return;
                  }
                  playSound();
                }}
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
                source={{uri:photoUri}}
                style={{ width: 80, height: 80, borderRadius: 9999 }}
              />
            </Animated.View>
          </View>
    
        </View>
      </Pressable>
    </View>
  );
}
