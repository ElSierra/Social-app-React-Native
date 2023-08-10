import { View, Text, Pressable } from "react-native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { CameraIcon, CloseCircleIcon } from "../../components/icons";
import PostButton from "../../components/postContent/PostButton";
import useGetMode from "../../hooks/GetMode";
import TextArea from "../../components/postContent/TextArea";
import { PostContentProp } from "../../types/navigation";
import ImagePicker from "react-native-image-crop-picker";

export default function PostContent({ navigation }: PostContentProp) {
  const dark = useGetMode();
  const backgroundColor = dark ? "white" : "black";
  const rippleColor = !dark ? "#ABABAB" : "#55555500";
  return (
    <AnimatedScreen>
      <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 9999,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => {
                navigation.pop();
              }}
              style={{
                flex: 1,
                borderRadius: 9999,
                justifyContent: "center",
                alignItems: "center",
              }}
              android_ripple={{ color: backgroundColor, foreground: true }}
            >
              <CloseCircleIcon size={30} color={backgroundColor} />
            </Pressable>
          </View>
          <PostButton />
        </View>
        <TextArea />
        <View style={{position:"absolute",bottom:0}}>
          <View
            style={{
              borderColor: "#B4B4B488",
              borderWidth: 1,
              width: 100,
              borderRadius: 10,
              marginBottom:20,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              android_ripple={{ color: rippleColor, foreground: true }}
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CameraIcon color={backgroundColor} size={40} />
            </Pressable>
          </View>
        </View>
      </View>
    </AnimatedScreen>
  );
}
