import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboard from "../screen/Onboard";
import useGetMode from "../hooks/GetMode";

const Stack = createNativeStackNavigator();
export default function OnboardNavigation() {
  const dark = useGetMode();
  const isDark = dark;
  const backgroundColor = isDark ? "black" : "white";
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor } }}
    >
      <Stack.Screen component={Onboard} name="Onboard" />
    </Stack.Navigator>
  );
}



