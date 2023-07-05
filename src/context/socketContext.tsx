import { createContext } from "react";
import { Socket } from "socket.io-client";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const SocketContext = createContext<Socket>(null);
