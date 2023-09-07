import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { useAppSelector } from "../redux/hooks/hooks";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
const token = useAppSelector((state)=> state.user.token)
  useEffect(() => {
    if (token) {
      const newSocket = io(process.env.EXPO_PUBLIC_API_URL as string, {
        autoConnect: true,
        auth: {
          token,
        },
      });
      setSocket(newSocket);
    }
  }, [token,io]);

  return socket;
};

export default useSocket;
