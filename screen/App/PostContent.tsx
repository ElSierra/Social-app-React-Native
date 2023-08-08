import { View, Text } from "react-native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { CloseCircleIcon } from "../../components/icons";
import PostButton from "../../components/postContent/PostButton";
import useGetMode from "../../hooks/GetMode";
import TextArea from "../../components/postContent/TextArea";

export default function PostContent() {
  const dark = useGetMode();
  const backgroundColor = dark ? "white" : "black";
 
  return (
    <AnimatedScreen>
      <View style={{ flex: 1,padding:20,marginTop:30 }}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <CloseCircleIcon size={30} color={backgroundColor} />
          <PostButton/>
        </View>
        <TextArea/>
      </View>
    </AnimatedScreen>
  );
}
