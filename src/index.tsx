import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./features";
import { MuiThemeProvider } from "./context/muiTheme";
import { RouterProvider } from "./context/routerProvider";
import { AmplifyClient } from "./context/amplifyClient";
import { MuiCalenderProvider } from "./context/muiCalenderProvider";
import { ReduxProvider } from "./context/redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MuiThemeProvider>
      <MuiCalenderProvider>
        <RouterProvider>
          <ReduxProvider>
            <AmplifyClient>
              <App />
            </AmplifyClient>
          </ReduxProvider>
        </RouterProvider>
      </MuiCalenderProvider>
    </MuiThemeProvider>
  </React.StrictMode>
);
