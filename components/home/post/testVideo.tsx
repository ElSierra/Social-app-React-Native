import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { AVPlaybackStatus, Video } from "expo-av";
import Slider from "@react-native-community/slider";

export default function TestVideo() {
  // State variables for the playback status and the slider position
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus | null>(
    null
  );

  const [sliderPosition, setSliderPosition] = useState(0);

  // A reference to the video component
  const videoRef = React.useRef<any>(null);

  // A function to handle the playback status update
  const handlePlaybackStatusUpdate = (status: any) => {
    setPlaybackStatus(status);
    // If the playback is not buffering or seeking, sync the slider position with the current position
    if (!status.isBuffering && !status.isSeeking) {
      setSliderPosition(status.positionMillis);
    }
  };

  // A function to handle the slider value change
  const handleSliderValueChange = (value: number) => {
    // If the video is loaded, update the slider position and seek to that position
    if (playbackStatus && playbackStatus.isLoaded) {
      setSliderPosition(value);
      videoRef.current.seekAsync(value);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{
          uri: "https://res.cloudinary.com/dyoauaqmi/video/upload/v1691520472/EDM_POP_UP_EVENT_v2_lowres_yqdprq.mp4",
        }} // Replace with your own audio file
        useNativeControls={false} // Disable the native controls
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate} // Set the callback for updating playback status
        style={styles.video}
      />
      <Slider
        value={sliderPosition} // Set the initial value to zero
        minimumValue={0} // Set the minimum value to zero
        maximumValue={
          playbackStatus && playbackStatus.isLoaded // If the video is loaded, set the maximum value to the duration, otherwise zero
            ? playbackStatus.durationMillis
            : 0
        }
        onValueChange={handleSliderValueChange} // Set the callback for changing slider value
        style={styles.slider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: 300,
    height: 300,
  },
  slider: {
    width: 300,
    height: 40,
  },
});
