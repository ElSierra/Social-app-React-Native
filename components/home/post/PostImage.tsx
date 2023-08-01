import { View, Text } from "react-native";
import { CommentIcon, Love, ProfileIcon, VerifiedIcon } from "../../icons";
import { Image } from "expo-image";
import PostBuilder from "./components/PostBuilder";

export default function PostImage() {
  return (
    <PostBuilder imageUri={require("../../../assets/avatar/1.jpg")}>
      <View
        style={{
          height: "auto",
          gap: 8,
        }}
      >
        <View>
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "jakaraBold",
                includeFontPadding: false,
                fontSize: 18,
              }}
            >
              Jane Fox
            </Text>
            <VerifiedIcon color="green" size={20}/>
            
            <Text
              style={{
                fontFamily: "jakara",
                includeFontPadding: false,
                color: "#7a868f",
                fontSize: 18,
                marginBottom:2,
              }}
            >
              @janefox
            </Text>
          </View>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <View style={{ width: "100%", height: 150, marginBottom: 10 }}>
          <Image
            contentFit="cover"
            transition={1000}
            style={{ flex: 1, width: "100%", borderRadius: 15 }}
            source={require("../../../assets/images/image1.jpg")}
          />
        </View>
      </View>
    </PostBuilder>
  );
}
