import { View, Text, Pressable } from "react-native";
import { CommentIcon, Love, PlayIcon, ProfileIcon } from "../../icons";
import { Video, ResizeMode } from "expo-av";
import { useRef, useState } from "react";
import IconButton from "../../global/IconButton";
import { Image } from "expo-image";
import PostBuilder from "./components/PostBuilder";
export default function PostVideo() {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [play, setPlay] = useState(false);

  const handlePlay = () => {
    setPlay(!play);
  };
  return (
    <View style={{ width: "100%", gap: 6 }}>
      <PostBuilder
        imageUri={require("../../../assets/avatar/2.jpg")}
        userTag="mayakey"
      >
        <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "jakaraBold",
              includeFontPadding: false,
              fontSize: 18,
            }}
          >
            Maya Key
          </Text>
          <Text
            style={{
              fontFamily: "jakara",
              includeFontPadding: false,
              color: "#7a868f",
              fontSize: 18,
            }}
          >
            @mayakey
          </Text>
        </View>
        <View
          style={{
            height: "auto",
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <View style={{ width: "100%", height: 200 }}>
            <Pressable
              onPress={handlePlay}
              style={{
                position: "absolute",

                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 50,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: play ? "transparent" : "#0000008E",
              }}
            >
              <IconButton
                Icon={play ? <></> : <PlayIcon size={60} color="white" />}
                onPress={handlePlay}
              />
            </Pressable>
            <Video
              ref={video}
              style={{ flex: 1, width: "100%", borderRadius: 10 }}
              source={{
                uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
              }}
              useNativeControls={false}
              resizeMode={ResizeMode.COVER}
              shouldPlay={play}
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems:"center"}}
          >
            <Text style={{fontFamily:"jakaraBold", fontSize:20}}>Welcome to Social</Text>
            <Text>100K Views</Text>
          </View>
        </View>
      </PostBuilder>
    </View>
  );
}
