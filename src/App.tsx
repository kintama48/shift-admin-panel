import { Refine } from "@refinedev/core";

import { notificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
// import dataProvider from "@refinedev/simple-rest";
import {dataProvider} from "./rest-data-provider";
import { BrowserRouter } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { getRoutes } from "./utils/routes.utils";
import { DingtalkOutlined } from "@ant-design/icons";
import authProvider from "./authProvider";

export const provider = dataProvider(process.env.REACT_APP_API_URL!);

function App() {
  return (
    <BrowserRouter>
      <ColorModeContextProvider>
        <Refine
          authProvider={authProvider}
          notificationProvider={notificationProvider}
          routerProvider={routerBindings}
          dataProvider={provider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
          resources={[
            {
              name: "exercise",
              list: "/exercise",
              show: "/exercise/show/:id",
              create: "/exercise/create",
              edit: "/exercise/edit/:id",
              icon: <DingtalkOutlined />,
            },
          ]}
        >
          {getRoutes()}
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
