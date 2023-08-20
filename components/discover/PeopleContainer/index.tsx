import { View, Text } from "react-native";

import { Image } from "expo-image";
import { Button } from "react-native-paper";
import { BlurView } from "expo-blur";
export default function PeopleContainer() {
  return (
    <View
      style={{
        width: "100%",
        overflow: "hidden",
        justifyContent: "space-between",
        padding: 6,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#e5e9f8",
        borderRadius: 20,
      }}
    >
        <BlurView style={{position:"absolute",height:100,width:"100%"}}/>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          source={require("../../../assets/avatar/placeholder.png")}
          style={{ height: 50, width: 50, borderRadius: 9999 }}
        />
        <View>
          <Text style={{ fontSize: 18, fontFamily: "mulishBold" }}>
            Isaac Ojo
          </Text>
          <Text style={{ fontFamily: "jakara" }}>@hojoIsaac</Text>
        </View>
      </View>
      <Button mode={"outlined"} textColor="black">
        Follow
      </Button>

     
    </View>
  );
}
