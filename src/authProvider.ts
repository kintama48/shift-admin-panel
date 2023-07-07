import type { AuthBindings } from "@refinedev/core";
import { provider } from "./App";

const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const res = await provider.custom({
      url: `${process.env.REACT_APP_API_URL!}/login`,
      method: "post",
      payload: { email, password },
    });
    if (res.data && res.data.role === "ADMIN") {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      return {
        success: true,
        redirectTo: "/",
      };
    } else {
      return {
        success: false,
        error: {
          message: "Login Error",
          name: "Invalid email or password",
        },
      };
    }
  },
  check: async () => {
    if (localStorage.getItem("user")) {
      return {
        authenticated: true,
      };
    } else {
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
        error: {
          message: "Check failed",
          name: "Unauthorized",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return {};
  },
};

export default authProvider;
