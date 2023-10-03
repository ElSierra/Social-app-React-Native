import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screen/Auth/Login";
import useGetMode from "../hooks/GetMode";
import Register from "../screen/Auth/Register";
import { AuthRootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<AuthRootStackParamList>();

export default function Auth() {
  const dark = useGetMode();
  const isDark = dark;

  const backgroundColor= isDark ? "black" : "white"
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false, contentStyle:{backgroundColor},}}>
      <Stack.Screen name="Login"  component={Login} options={{ animation:"slide_from_left"}}/>
      <Stack.Screen name="Register" component={Register} options={{ animation:"slide_from_right"}} />
    </Stack.Navigator>
  );
}
