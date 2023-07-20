import type { AuthBindings } from "@refinedev/core";
import { provider } from "./App";
import jwt_decode from "jwt-decode";

const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const res = await provider.custom({
      url: `${process.env.REACT_APP_API_URL!}/api/users/login`,
      method: "post",
      payload: { email, password },
    });

    console.log("HEREEEEEEEEEEEE");

    if (res.data.token) {
      try {
        const { userId, role } = jwt_decode<{ userId: string; role: string }>(res.data.token);

        console.log(userId, role);

        if (role !== "admin") {
          return {
            success: false,
            error: {
              message: "Login Error",
              name: "Invalid email or password",
            },
          };
        }

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({ userId, role }));
        return {
          success: true,
          redirectTo: "/",
        };
      } catch (error) {
        return {
          success: false,
          error: {
            message: "Login Error",
            name: "Invalid token",
          },
        };
      }
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
