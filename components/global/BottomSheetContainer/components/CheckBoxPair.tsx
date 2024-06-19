import { View, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAppDispatch } from "../../../../redux/hooks/hooks";
import { setMode } from "../../../../redux/slice/prefs";
import useGetMode from "../../../../hooks/GetMode";

export default function CheckBoxPair({
  text,
  type,
  checked,
}: {
  text: string;
  checked: boolean;
  type: "system" | "light" | "dark";
}) {
  const dispatch = useAppDispatch();
  const dark = useGetMode();
  const color = !dark ? "black" : "white";
  const fillColor = !dark ? "black" : "white";
  const unFillColor = !dark ? "#505050" : "#757575";
  const handleUpdateMode = ()=>{
    dispatch(setMode({ mode: type }));
  }
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical:2,
        borderRadius:20,
      
        width: "100%",
      }}
    >
      <Text
        style={{
          paddingLeft: 15,
          fontSize: 20,
          color,
          fontFamily: "mulishMedium",
          includeFontPadding: false,
        }}
      >
        {text}
      </Text>
   <View key={Math.random()}>
        <BouncyCheckbox
          size={24}
          isChecked={checked}
          fillColor={fillColor}
          unFillColor={unFillColor}
          
          iconStyle={{ borderColor: "black" }}
          innerIconStyle={{ borderWidth: 0 }}
          onPress={handleUpdateMode}
        />
   </View>
    </View>
  );
}
