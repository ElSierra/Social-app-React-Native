import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, useColorScheme } from "react-native";
import Onboard from "../screen/Onboard";

const Stack = createNativeStackNavigator();
export default function OnboardNavigation() {

  
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const style = isDark ? "light" : "dark";
  const tint = isDark ? "dark" : "light";
  const backgroundColor = isDark ? "black" : "white";
  return (
    <Stack.Navigator screenOptions={{ headerShown: false,contentStyle: {backgroundColor} }}>
      <Stack.Screen component={Onboard} name="Onboard" />
    </Stack.Navigator>
  );
}
