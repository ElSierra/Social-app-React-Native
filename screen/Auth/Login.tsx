import {
  View,
  Text,
  useColorScheme,
  ScrollView,
  Dimensions,
} from "react-native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { Image } from "expo-image";
import InputText from "./components/InputText";
import InputPassword from "./components/InputPassword";
import Button from "../../components/global/Buttons/Button";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setRoute } from "../../redux/slice/routes";
import useGetMode from "../../hooks/GetMode";
import { useState } from "react";
import Toast from "react-native-toast-message";
const width = Dimensions.get("screen").width;
export default function Login() {
  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "white" : "black";
  const buttonColor = !isDark ? "white" : "black";
  const dispatch = useAppDispatch();

  //TODO: Change loading to authentication when api is implemented
  const [loading, setLoading] = useState(false);

  return (
    <AnimatedScreen>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: 25,
            paddingBottom: 50,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View>
              <Image
                source={require("../../assets/images/auth.png")}
                contentFit="contain"
                style={{ height: 200, width }}
              />
            </View>
            <Text style={{ color, fontFamily: "mulishBold", fontSize: 24 }}>
              Welcome Back
            </Text>
            <Text style={{ color, fontFamily: "mulish", fontSize: 14 }}>
              sign in to access your account
            </Text>
            <View style={{ gap: 30, marginTop: 70 }}>
              <InputText />
              <InputPassword />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 40,
            paddingHorizontal: 25,
          }}
        >
          <Button
            loading={loading}
            onPress={() => {
              setLoading(true);
              Toast.show({
                type: "authSuccess",
                text1: "Signin Success",
              });
              dispatch(setRoute({ route: "App" }));
          
            }}
          >
            <Text
              style={{
                fontFamily: "jakaraBold",
                fontSize: 15,
                color: buttonColor,
              }}
            >
              Login
            </Text>
          </Button>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color, includeFontPadding: false }}>
              New Member?
            </Text>
            <Text
              style={{
                color,
                fontFamily: "jakaraBold",
                includeFontPadding: false,
              }}
            >
              Register Now
            </Text>
          </View>
        </View>
      </View>
    </AnimatedScreen>
  );
}
