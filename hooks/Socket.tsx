import { useState, useEffect, useRef, useMemo } from "react";
import io, { Socket } from "socket.io-client";
import { useAppSelector } from "../redux/hooks/hooks";

const useSocket = (): Socket | undefined => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const token = useAppSelector((state) => state.user.token);
  const socketRef = useRef<Socket>(null);
  useMemo(() => {
    if (token) {
      socketRef.current = io(process.env.EXPO_PUBLIC_API_URL as string, {
        autoConnect: true,
        auth: {
          token,
        },
      });
    }
  }, [token]);

  return socketRef?.current;
};

export default useSocket;
