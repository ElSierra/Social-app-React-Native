import { Theme } from "@react-navigation/native";

export const themeLight: Theme = {
  dark: false,
  colors: {
    primary: "white",
    background: "white",
    card: "black",
    text: "black",
    border: "#FFFFFF30",
    notification: "black",
  },
};
export const themeDark: Theme = {
  dark: true,
  colors: {
    primary: "white",
    background: "black",
    card: "white",
    text: "white",
    border: "#FFFFFF30",
    notification: "white",
  },
};
