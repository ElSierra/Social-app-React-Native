import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import Login from "../screen/Auth/Login";
import useGetMode from "../hooks/GetMode";

const Stack = createNativeStackNavigator();

export default function Auth() {
  const dark = useGetMode();
  const isDark = dark;
  console.log("🚀 ~ file: Auth.tsx:11 ~ Auth ~ isDark:", isDark)
  const backgroundColor= isDark ? "black" : "white"
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false, contentStyle:{backgroundColor} }}>
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
}
