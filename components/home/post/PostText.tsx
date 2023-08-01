import { View, Text } from "react-native";
import { CommentIcon, Love, ProfileIcon } from "../../icons";
import { Image } from "expo-image";
import PostBuilder from "./components/PostBuilder";
export default function PostText() {
  return (
    <View style={{ width: "100%", gap: 6 }}>
      <PostBuilder imageUri={require("../../../assets/avatar/3.jpg")}>
        <View
          style={{
            marginBottom: 10,
            height: "auto",
          }}
        >
          <View>
            <View
              style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
            >
              <Text
                style={{
                  fontFamily: "jakaraBold",
                  includeFontPadding: false,
                  fontSize: 18,
                }}
              >
                Mary
              </Text>
              <Text
                style={{
                  fontFamily: "jakara",
                  includeFontPadding: false,
                  color: "#7a868f",
                  fontSize: 18,
                }}
              >
                @maryfive
              </Text>
            </View>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
          <View>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
        </View>
      </PostBuilder>
    </View>
  );
}
