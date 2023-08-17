import {
  View,
  Text,
  useColorScheme,
  ScrollView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { Image } from "expo-image";
import InputText from "./components/InputText";
import InputPassword from "./components/InputPassword";
import Button from "../../components/global/Buttons/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setRoute } from "../../redux/slice/routes";
import useGetMode from "../../hooks/GetMode";
import {
  LegacyRef,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { openToast } from "../../redux/slice/toast/toast";
import { useLoginMutation } from "../../redux/api/auth";
import { signOut } from "../../redux/slice/user";
import { useForm, Controller } from "react-hook-form";

const width = Dimensions.get("screen").width;
export default function Login() {
  const dark = useGetMode();
  const isDark = dark;
  const [login, loginResponse] = useLoginMutation();
  const color = isDark ? "white" : "black";
  const buttonColor = !isDark ? "white" : "black";
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.user.data?.name);
  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  //
  const animUser = useRef(new Animated.Value(0));
  const animPass = useRef(new Animated.Value(0));
  const scrollViewRef = useRef<ScrollView | null>(null);
  const shakeUserName = useCallback(() => {
    vibrateAnimation(animUser);
  }, []);
  const shakePassword = useCallback(() => {
    vibrateAnimation(animPass);
  }, []);

  const onSubmit = (data: { userName: string; password: string }) => {
    login({ userName: data.userName.trim(), password: data.password })
      .unwrap()
      .then((e) => {
        console.log(e);
        dispatch(openToast({ text: "Successful Login", type: "Success" }));
      })
      .catch((e) => {
        console.log(e);

        dispatch(openToast({ text: e.data?.msg, type: "Failed" }));
      });
  };
  useEffect(() => {
    if (errors.userName) {
      shakeUserName();
    }
    if (errors.password) {
      shakePassword();
    }
  }, [errors.userName, errors.password]);

  const vibrateAnimation = (name: React.MutableRefObject<Animated.Value>) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(name.current, {
          useNativeDriver: true,
          toValue: -2,
          duration: 50,
        }),

        Animated.timing(name.current, {
          useNativeDriver: true,
          toValue: 2,
          duration: 50,
        }),

        Animated.timing(name.current, {
          useNativeDriver: true,
          toValue: 0,
          duration: 50,
        }),
      ]),
      { iterations: 2 }
    ).start();
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        scrollViewRef.current?.scrollTo({ x: 80, y: 0, animated: true });
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <AnimatedScreen>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollViewRef}
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
                Welcome Back{name && `, ${name.split(" ")[0]}`}
              </Text>
              <Text style={{ color, fontFamily: "mulish", fontSize: 14 }}>
                sign in to access your account
              </Text>
              <View style={{ gap: 30, marginTop: 70 }}>
                <Animated.View
                  style={{ transform: [{ translateX: animUser.current }] }}
                >
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputText
                        style={{
                          borderColor: errors.userName ? "red" : "",
                          borderWidth: errors.userName ? 1 : 0,
                        }}
                        props={{
                          value: value,
                          onBlur,
                          onChangeText: onChange,
                        }}
                      />
                    )}
                    name="userName"
                  />
                </Animated.View>
                <Animated.View
                  style={{ transform: [{ translateX: animPass.current }] }}
                >
                  <Controller
                    control={control}
                    rules={{
                      maxLength: 100,
                      minLength: 3,
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputPassword
                        style={{
                          borderColor: errors.password ? "red" : "",
                          borderWidth: errors.password ? 1 : 0,
                        }}
                        props={{
                          value,
                          onChangeText: onChange,
                          onBlur,
                        }}
                      />
                    )}
                    name="password"
                  />
                </Animated.View>
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
              loading={loginResponse.isLoading}
              onPress={() => {
                Keyboard.dismiss()
                handleSubmit(onSubmit)();
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
      </TouchableWithoutFeedback>
    </AnimatedScreen>
  );
}