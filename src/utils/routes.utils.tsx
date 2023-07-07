import { ErrorComponent, ThemedLayoutV2 } from "@refinedev/antd";
import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { Outlet, Route, Routes } from "react-router-dom";
import "@refinedev/antd/dist/reset.css";
import React from "react";
import { Authenticated } from "@refinedev/core";
import { AuthPage } from "components/pages/auth";
import { AntdInferencer } from "@refinedev/inferencer/dist/inferencers";

const header: React.FC = () => {
  return (
    <div>
      <img src={"/logo3.png"} alt={"logo"} width={50} height={50} />
    </div>
  );
};

export const getRoutes = () => {
  return (
    <Routes>
      {/*<Route*/}
      {/*  element={*/}
      {/*    <Authenticated fallback={<CatchAllNavigate to={"/login"} />}>*/}
      {/*      <ThemedLayoutV2 Title={header} initialSiderCollapsed={true}>*/}
      {/*        <Outlet />*/}
      {/*      </ThemedLayoutV2>*/}
      {/*    </Authenticated>*/}
      {/*  }*/}
      {/*>*/}
        <Route index element={<NavigateToResource resource="exercise" />} />
        <Route path="exercise">
          <Route index element={<AntdInferencer />} />
          <Route path="show/:id" element={<AntdInferencer />} />
          <Route path="edit/:id" element={<AntdInferencer />} />
          <Route path="create" element={<AntdInferencer />} />
        </Route>
        <Route path="gratitude">
          <Route index element={<AntdInferencer />} />
          <Route path="show/:id" element={<AntdInferencer />} />
          <Route path="edit/:id" element={<AntdInferencer />} />
          <Route path="create" element={<AntdInferencer />} />
        </Route>
        <Route path="inspiration">
          <Route index element={<AntdInferencer />} />
          <Route path="show/:id" element={<AntdInferencer />} />
          <Route path="edit/:id" element={<AntdInferencer />} />
          <Route path="create" element={<AntdInferencer />} />
        </Route>
        <Route path="intention">
          <Route index element={<AntdInferencer />} />
          <Route path="show/:id" element={<AntdInferencer />} />
          <Route path="edit/:id" element={<AntdInferencer />} />
          <Route path="create" element={<AntdInferencer />} />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      {/*</Route>*/}
      {/*<Route*/}
      {/*  element={*/}
      {/*    <Authenticated fallback={<Outlet />}>*/}
      {/*      <NavigateToResource />*/}
      {/*    </Authenticated>*/}
      {/*  }*/}
      {/*>*/}
      {/*  <Route path="/login" element={<AuthPage type="login" />} />*/}
      {/*</Route>*/}
    </Routes>
  );
};
