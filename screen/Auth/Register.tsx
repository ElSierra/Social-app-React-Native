import {
  View,
  Text,
  useColorScheme,
  ScrollView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Vibration,
  Pressable,
} from "react-native";
import AnimatedScreen from "../../components/global/AnimatedScreen";

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
import { useLoginMutation, useRegisterMutation } from "../../redux/api/auth";
import { signOut } from "../../redux/slice/user";
import { useForm, Controller } from "react-hook-form";
import { RegisterScreen } from "../../types/navigation";
import ReAnimated, { FadeIn, FadeOut, useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import { Image } from "expo-image";

const width = Dimensions.get("window").width;
export default function Register({ navigation }: RegisterScreen) {
  const dark = useGetMode();
  const isDark = dark;

  const color = isDark ? "white" : "black";
  const buttonColor = !isDark ? "white" : "black";
  const borderColor = isDark ? "white" : "black";
  const dispatch = useAppDispatch();
  const [registerUser, regResponse] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      name: "",
      password: "",
      verifyPassword: "",
    },
  });
  //
  const animUser = useRef(new Animated.Value(0));
  const animPass = useRef(new Animated.Value(0));
  const animVPass = useRef(new Animated.Value(0));
  const animEmail = useRef(new Animated.Value(0));
  const animName = useRef(new Animated.Value(0));
  const scrollViewRef = useRef<ScrollView | null>(null);
  const verifyPassword = watch("password", "");
  const shakeUserName = useCallback(() => {
    vibrateAnimation(animUser);
  }, []);
  const shakePassword = useCallback(() => {
    vibrateAnimation(animPass);
  }, []);
  const shakeVPassword = useCallback(() => {
    vibrateAnimation(animVPass);
  }, []);
  const shakeEmail = useCallback(() => {
    vibrateAnimation(animEmail);
  }, []);
  const shakeName = useCallback(() => {
    vibrateAnimation(animName);
  }, []);
  const onSubmit = (data: {
    userName: string;
    password: string;
    email: string;
    name: string;
  }) => {
    registerUser(data)
      .unwrap()
      .then((e) => {
        dispatch(openToast({ type: "Success", text: "Successfully Created" }));
        navigation.replace("Login");
      })
      .catch((e) => {
        dispatch(openToast({ type: "Failed", text: e?.data.message }));
      });
  };
  useEffect(() => {
    if (errors.userName) {
      shakeUserName();
    }
    if (errors.password) {
      shakePassword();
    }
    if (errors.verifyPassword) {
      shakeVPassword();
    }
    if (errors.email) {
      shakeEmail();
    }
    if (errors.email) {
      shakeName();
    }
  }, [
    errors.userName,
    errors.password,
    errors.verifyPassword,
    errors.email,
    errors.name,
  ]);

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
  const keyboard = useAnimatedKeyboard({isStatusBarTranslucentAndroid:true});
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
    paddingTop:keyboard.height.value
  }));
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        scrollViewRef.current?.scrollTo({
          x: width / 2.5,
          y: 0,
          animated: true,
        });
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
        <ReAnimated.View style={[{ flex: 1 ,marginTop:40},animatedStyles]}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              paddingHorizontal: 25,
              paddingBottom: 50,
            }}
          >
            <View style={{ alignItems: "center", marginTop: 50 }}>
             
              <Text style={{ color, fontFamily: "mulishBold", fontSize: 24 }}>
                Sign up
              </Text>
              <Text style={{ color, fontFamily: "mulish", fontSize: 14 }}>
                register to gain acccess to a whole new world
              </Text>
              <View style={{ marginTop: 70 }}>
                <Animated.View
                  style={{
                    transform: [{ translateX: animEmail.current }],
                    marginBottom: 10,
                  }}
                >
                  <ReAnimated.View
                    entering={FadeIn.springify()}
                    style={{ marginVertical: 5 }}
                    exiting={FadeOut.springify()}
                  >
                    <Text style={{ color: "grey" }}>Enter Email</Text>
                  </ReAnimated.View>
                  <Controller
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      }, // Minimum length requirement
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputText
                        style={{
                          borderColor: errors.email ? "red" : "",
                          borderWidth: errors.email ? 1 : 0,
                        }}
                        props={{
                          value: value,
                          onBlur,
                          onChangeText: onChange,
                          placeholder: "Enter Email",
                        }}
                      />
                    )}
                    name="email"
                  />
                </Animated.View>
                <Animated.View
                  style={{
                    transform: [{ translateX: animName.current }],
                    marginBottom: 10,
                  }}
                >
                  <ReAnimated.View
                    entering={FadeIn.springify()}
                    style={{ marginVertical: 5 }}
                    exiting={FadeOut.springify()}
                  >
                    <Text style={{ color: "grey" }}>Enter Your name</Text>
                  </ReAnimated.View>
                  <Controller
                    control={control}
                    rules={{
                      required: "Name is required",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputText
                        style={{
                          borderColor: errors.name ? "red" : "",
                          borderWidth: errors.name ? 1 : 0,
                        }}
                        props={{
                          value: value,
                          onBlur,
                          onChangeText: onChange,
                          placeholder: "Enter Your Name",
                        }}
                      />
                    )}
                    name="name"
                  />
                </Animated.View>

                <Animated.View
                  style={{
                    transform: [{ translateX: animUser.current }],
                    marginBottom: 10,
                  }}
                >
                  {errors.userName?.message ? (
                    <ReAnimated.View
                      entering={FadeIn.springify()}
                      style={{ marginVertical: 5 }}
                      exiting={FadeOut.springify()}
                    >
                      <Text style={{ color: "red" }}>
                        {errors.userName?.message}
                      </Text>
                    </ReAnimated.View>
                  ) : (
                    <ReAnimated.View
                      entering={FadeIn.springify()}
                      style={{ marginVertical: 5 }}
                      exiting={FadeOut.springify()}
                    >
                      <Text style={{ color: "grey" }}>Enter Username</Text>
                    </ReAnimated.View>
                  )}
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      minLength: 1,
                      pattern: /^\S*$/,

                      // Minimum length requirement
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
                  style={{
                    transform: [{ translateX: animPass.current }],
                    marginBottom: 10,
                  }}
                >
                  <ReAnimated.View
                    entering={FadeIn.springify()}
                    style={{ marginVertical: 5 }}
                    exiting={FadeOut.springify()}
                  >
                    <Text style={{ color: "grey" }}>Strong password</Text>
                  </ReAnimated.View>

                  <Controller
                    control={control}
                    rules={{
                      maxLength: 100,
                      minLength: 6,
                      required: true,
                      pattern:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
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
                <Animated.View
                  style={{ transform: [{ translateX: animVPass.current }] }}
                >
                  {errors.verifyPassword?.message ===
                  "Passwords do not match" ? (
                    <ReAnimated.View
                      style={{ marginVertical: 5 }}
                      entering={FadeIn.springify()}
                      exiting={FadeOut.springify()}
                    >
                      <Text style={{ color: "red" }}>
                        {errors.verifyPassword?.message}
                      </Text>
                    </ReAnimated.View>
                  ) : (
                    <ReAnimated.View
                      style={{ marginVertical: 5 }}
                      entering={FadeIn.springify()}
                      exiting={FadeOut.springify()}
                    >
                      <Text style={{ color: "grey" }}>
                        {"Passwords should match"}
                      </Text>
                    </ReAnimated.View>
                  )}
                  <Controller
                    control={control}
                    rules={{
                      validate: (value) => {
                        return (
                          value === verifyPassword || "Passwords do not match"
                        );
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputPassword
                        style={{
                          borderColor: errors.verifyPassword ? "red" : "",
                          borderWidth: errors.verifyPassword ? 1 : 0,
                        }}
                        props={{
                          value,
                          onChangeText: onChange,
                          onBlur,
                          placeholder: "Verify Password",
                        }}
                      />
                    )}
                    name="verifyPassword"
                  />
                </Animated.View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 40,
              }}
            >
              <Button
                loading={regResponse.isLoading}
                onPress={() => {
                  Keyboard.dismiss();
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
                  Register
                </Text>
              </Button>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  style={{
                    width: "100%",
                    marginTop: 20,
                    height: "100%",
                    flexDirection: "row",
                    gap: 4,

                    borderStyle: "dashed",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                  onPress={() => navigation.replace("Login")}
                >
                  <Text style={{ color, includeFontPadding: false }}>
                    Have an account?
                  </Text>

                  <Text
                    style={{
                      color,
                      fontFamily: "jakaraBold",
                      includeFontPadding: false,
                    }}
                  >
                    Login
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </ReAnimated.View>
      </TouchableWithoutFeedback>
    </AnimatedScreen>
  );
}
