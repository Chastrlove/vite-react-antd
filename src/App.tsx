import React from "react";
import "./App.less";
import { RouterComponent } from "./router/Render";
import routes from "./router/Config";
import { GlobalProvider } from "./model/GlobalProvider";
import { AccessProvider } from "./router/access/Provider";

function App() {
  return (
    <GlobalProvider>
      <AccessProvider routes={routes}>
        <RouterComponent />
      </AccessProvider>
    </GlobalProvider>
  );
}

export default App;
