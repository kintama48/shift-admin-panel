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
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { ExerciseList } from "../pages/Exercise/list";
import { ExerciseShow } from "../pages/Exercise/show";
import { ExerciseEdit } from "../pages/Exercise/edit";
import { ExerciseCreate } from "../pages/Exercise/create";
import { Header } from "../components";

const header: React.FC = () => {
  return (
    <div>
      <img src={"/logo.png"} alt={"logo"} width={50} height={50} />
    </div>
  );
};

export const getRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated fallback={<CatchAllNavigate to={"/login"} />}>
            <ThemedLayoutV2
              Header={Header}
              Title={header}
              initialSiderCollapsed={true}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource="exercise" />} />
        <Route path="exercise">
          <Route index element={<ExerciseList />} />
          <Route path="show/:id" element={<ExerciseShow />} />
          <Route path="edit/:id" element={<ExerciseEdit />} />
          <Route path="create" element={<ExerciseCreate />} />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      </Route>
      <Route
        element={
          <Authenticated fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<AuthPage type="login" />} />
      </Route>
      <Route
        element={
          <Authenticated fallback={<Outlet />}>
            <ThemedLayoutV2>
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route path="*" element={<ErrorComponent />} />
      </Route>
    </Routes>
  );
};
