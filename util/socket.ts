import { io } from "socket.io-client";
import storage from "../redux/storage";
import { store } from "../redux/store";

console.log("called");
const persistRoot = storage.getString("persist:root");
const userId = (): string | undefined => {
  if (persistRoot) {
    const routes = JSON.parse(persistRoot);
    if (routes) {
      const user = JSON.parse(routes.user);

      return user.token;
    }
    return undefined;
  }
  return undefined;
};
userId();
console.log("🚀 ~ file: socket.ts:20 ~ userId:", userId());
const socket = io(process.env.EXPO_PUBLIC_API_URL as string, {
  autoConnect: true,
  auth: {
    token: userId(),
  },
});
export default socket;
