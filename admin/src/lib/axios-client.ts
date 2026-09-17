import axios from "axios";
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

import {
  mockAdminUser,
  mockBanners,
  mockCategories,
  mockCustomers,
  mockOrderDetail,
  mockOrders,
  mockOverview,
  mockRestaurants,
  mockRiders,
  mockSettings,
} from "./mock-data";

/**
 * Set VITE_API_URL in admin/.env to point at a different host. Leave it unset in
 * production: the API serves this build, so a relative path keeps the auth
 * cookie same-origin.
 */
const baseURL =
  import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "/api/v1" : "http://localhost:8000/api/v1");

/** The shape the API's error handler returns for every failure. */
export type ApiErrorBody = {
  success: false;
  errorCode: string;
  message: string;
  errors?: { field: string; message: string }[];
};

export class ApiError extends Error {
  public readonly status: number;
  public readonly errorCode: string;
  public readonly fieldErrors: { field: string; message: string }[];

  constructor(
    message: string,
    status: number,
    errorCode: string,
    fieldErrors: ApiError["fieldErrors"] = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorCode = errorCode;
    this.fieldErrors = fieldErrors;
  }
}

const isDev = import.meta.env.DEV;
const MOCK_SESSION_KEY = "chowly_mock_admin_session";

function handleDevMock(config: InternalAxiosRequestConfig) {
  if (!isDev) return null;

  const url = config.url || "";
  const method = (config.method || "get").toLowerCase();
  const isMockActive = typeof window !== "undefined" && localStorage.getItem(MOCK_SESSION_KEY) === "true";

  // Mock login: accepts admin@chowly.app with any password
  if (url.includes("/auth/login") && method === "post") {
    let body = config.data;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        // use raw body
      }
    }

    if (body?.email?.trim().toLowerCase() === "admin@chowly.app") {
      if (typeof window !== "undefined") {
        localStorage.setItem(MOCK_SESSION_KEY, "true");
      }

      return {
        data: {
          message: "Signed in successfully",
          data: { accessToken: "mock-admin-token", user: mockAdminUser },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }
  }

  // Mock logout
  if (url.includes("/auth/logout") && method === "post") {
    if (typeof window !== "undefined") {
      localStorage.removeItem(MOCK_SESSION_KEY);
    }

    return {
      data: { message: "Logged out" },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    };
  }

  // Active mock session handlers
  if (isMockActive) {
    if (url.includes("/auth/me")) {
      return {
        data: { message: "Current user", data: { user: mockAdminUser } },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/admin/analytics/overview")) {
      return {
        data: { message: "Analytics overview", data: mockOverview },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/admin/orders") && !url.match(/\/admin\/orders\/[a-zA-Z0-9_-]+/)) {
      return {
        data: {
          message: "Orders list",
          data: {
            orders: mockOrders,
            total: mockOrders.length,
            page: 1,
            pages: 1,
            stats: {
              ordersToday: 42,
              awaitingAction: 8,
              onDelivery: 6,
              revenueToday: 128450,
            },
          },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.match(/\/admin\/orders\/[a-zA-Z0-9_-]+/)) {
      return {
        data: { message: "Order detail", data: { order: mockOrderDetail } },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/restaurants") || url.includes("/admin/restaurants")) {
      if (url.match(/\/admin\/restaurants\/[a-zA-Z0-9_-]+/)) {
        return {
          data: {
            message: "Restaurant detail",
            data: {
              restaurant: mockRestaurants[0],
              dishes: [
                {
                  _id: "dish_1",
                  name: "Truffle Smash Burger",
                  description: "Double grass-fed patty, truffle aioli, aged cheddar, toasted brioche.",
                  imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
                  price: 1450,
                  section: "Burgers",
                  isAvailable: true,
                  isPopular: true,
                  optionGroups: [],
                  updatedAt: new Date().toISOString(),
                },
              ],
              sections: ["Burgers", "Sides", "Beverages"],
              stats: { ordersToday: 24, revenueToday: 76500, activeDishes: 12 },
              defaultCommissionRate: 20,
            },
          },
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        };
      }

      return {
        data: {
          message: "Restaurants list",
          data: {
            restaurants: mockRestaurants,
            total: mockRestaurants.length,
            page: 1,
            pages: 1,
            stats: { total: 4, active: 4, inactive: 0 },
            cuisines: ["Burgers", "Pizza", "Ramen", "Mexican"],
            defaultCommissionRate: 20,
          },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/categories") || url.includes("/admin/categories")) {
      return {
        data: {
          message: "Categories list",
          data: {
            categories: mockCategories,
            stats: { total: mockCategories.length, active: mockCategories.length },
          },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/admin/riders")) {
      return {
        data: {
          message: "Riders list",
          data: {
            riders: mockRiders,
            total: mockRiders.length,
            page: 1,
            pages: 1,
            stats: { total: 3, online: 2, pending: 0, earningsToday: 42800 },
          },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/admin/customers")) {
      return {
        data: {
          message: "Customers list",
          data: {
            customers: mockCustomers,
            total: mockCustomers.length,
            page: 1,
            pages: 1,
            stats: { total: 2, activeThisMonth: 2, newThisMonth: 1 },
          },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/admin/banners")) {
      return {
        data: {
          message: "Banners list",
          data: {
            banners: mockBanners,
            stats: { total: mockBanners.length, active: mockBanners.length, scheduled: 0 },
          },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/admin/settings")) {
      return {
        data: { message: "Platform settings", data: { settings: mockSettings } },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    // Generic mutations fallback in dev mock mode
    if (method === "patch" || method === "post" || method === "put" || method === "delete") {
      return {
        data: { message: "Updated successfully" },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }
  }

  return null;
}

export const API: AxiosInstance = axios.create({
  baseURL,
  timeout: 20_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  adapter: async (config) => {
    const mock = handleDevMock(config);
    if (mock) return mock;

    const defaultAdapter = axios.getAdapter(axios.defaults.adapter);
    return defaultAdapter(config);
  },
});

API.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiErrorBody>) => {
    const body = error.response?.data;
    const status = error.response?.status ?? 0;

    if (!error.response) {
      throw new ApiError(
        "Can't reach the Chowly API. Check that it is running and try again.",
        0,
        "ERR_NETWORK",
      );
    }

    throw new ApiError(
      body?.message ?? "Something went wrong. Please try again.",
      status,
      body?.errorCode ?? "ERR_INTERNAL",
      body?.errors ?? [],
    );
  },
);
