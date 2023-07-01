import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import MainRoutes from "./MainRoutes.tsx";
import { store } from "./store/index.ts";
import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import Passwordless from "supertokens-web-js/recipe/passwordless";
import 'react-toastify/dist/ReactToastify.css';

SuperTokens.init({
  appInfo: {
    apiDomain: import.meta.env.VITE_REACT_APP_API_SERVER_URL,
    apiBasePath: "/auth",
    appName: "Whatsup",
  },
  recipeList: [Session.init(), Passwordless.init()],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainRoutes />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
