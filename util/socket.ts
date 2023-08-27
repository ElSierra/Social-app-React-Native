import { io } from "socket.io-client";
const socket = io(process.env.EXPO_PUBLIC_API_URL as string, {
  autoConnect: true,
});
export default socket;
