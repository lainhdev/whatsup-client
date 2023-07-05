import { io } from "socket.io-client";

import Session from "supertokens-web-js/recipe/session";

const URL = import.meta.env.VITE_REACT_APP_API_SERVER_URL;

export async function initSocketConnection() {
  const token = await Session.getAccessToken();
  if (token === undefined) {
    throw new Error("User is not logged in");
  }
  const socket = io(URL, {
    query: { token },
    transports: ["websocket", "polling"],
    withCredentials: true,
  });
  return socket;
}
