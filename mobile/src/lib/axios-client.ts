import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { clearAccessToken, getAccessToken } from "@/features/auth/token-storage";
import {
  mockAddresses,
  mockBanners,
  mockCategories,
  mockCustomerUser,
  mockDriverDeliveries,
  mockDriverSummary,
  mockDriverUser,
  mockOrders,
  mockRestaurantDishes,
  mockRestaurants,
} from "./mock-data";

/**
 * Set EXPO_PUBLIC_API_URL in mobile/.env. On an Android emulator run
 * `adb reverse tcp:8000 tcp:8000` so localhost reaches the API on your machine;
 * on a physical device use your machine's LAN IP.
 */
const baseURL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

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

  constructor(message: string, status: number, errorCode: string, fieldErrors: ApiError["fieldErrors"] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorCode = errorCode;
    this.fieldErrors = fieldErrors;
  }
}

const handleMobileDevMock = async (config: InternalAxiosRequestConfig) => {
  if (!__DEV__) return null;

  const url = config.url || "";
  const method = (config.method || "get").toLowerCase();
  const token = await getAccessToken();

  // Mock login: customer@chowly.app or driver@chowly.app
  if (url.includes("/auth/login") && method === "post") {
    let body = config.data;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        // use raw body
      }
    }

    const email = body?.email?.trim().toLowerCase();
    if (email === "customer@chowly.app") {
      return {
        data: {
          message: "Signed in successfully",
          data: { accessToken: "mock-customer-token", user: mockCustomerUser, hasAddress: true },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (email === "driver@chowly.app") {
      return {
        data: {
          message: "Signed in successfully",
          data: { accessToken: "mock-driver-token", user: mockDriverUser, hasAddress: true },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }
  }

  // Active mock session handlers
  if (token === "mock-customer-token" || token === "mock-driver-token") {
    const isDriver = token === "mock-driver-token";

    if (url.includes("/auth/me")) {
      return {
        data: {
          message: "Current user",
          data: { user: isDriver ? mockDriverUser : mockCustomerUser, hasAddress: true },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/addresses")) {
      return {
        data: { message: "Addresses", data: { addresses: mockAddresses } },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/banners")) {
      return {
        data: { message: "Banners", data: { banners: mockBanners } },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/categories")) {
      return {
        data: { message: "Categories", data: { categories: mockCategories } },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/restaurants") && url.match(/\/restaurants\/[a-zA-Z0-9_-]+/)) {
      return {
        data: {
          message: "Restaurant detail",
          data: { restaurant: mockRestaurants[0], dishes: mockRestaurantDishes },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/restaurants")) {
      return {
        data: { message: "Restaurants", data: { restaurants: mockRestaurants, total: mockRestaurants.length } },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/orders") && url.match(/\/orders\/[a-zA-Z0-9_-]+/)) {
      return {
        data: { message: "Order detail", data: { order: mockOrders[0] } },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/orders")) {
      return {
        data: { message: "Orders", data: { orders: mockOrders } },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/driver/home")) {
      return {
        data: {
          message: "Driver home",
          data: { active: [], ready: mockDriverDeliveries, summary: mockDriverSummary },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/driver/deliveries")) {
      return {
        data: { message: "Delivery detail", data: mockDriverDeliveries[0] },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (url.includes("/driver/online")) {
      return {
        data: { message: "Status updated", data: { isOnline: true } },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    if (method === "patch" || method === "post" || method === "put" || method === "delete") {
      return {
        data: { message: "Action successful" },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }
  }

  return null;
};

// eslint-disable-next-line import/no-named-as-default-member
export const API: AxiosInstance = axios.create({
  baseURL,
  timeout: 20_000,
  headers: { "Content-Type": "application/json" },
  adapter: async (config) => {
    const mock = await handleMobileDevMock(config);
    if (mock) return mock;

    // eslint-disable-next-line import/no-named-as-default-member
    const defaultAdapter = axios.getAdapter(axios.defaults.adapter);
    return defaultAdapter(config);
  },
});

API.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

API.interceptors.response.use(
  // Callers receive the parsed body directly, so no `.data.data` chains upstream.
  (response) => response.data,
  async (error: AxiosError<ApiErrorBody>) => {
    const body = error.response?.data;
    const status = error.response?.status ?? 0;
    // A rejected token is dead weight: drop it so the app returns to signed-out.
    if (status === 401) await clearAccessToken();
    if (!error.response) {
      throw new ApiError(
        "Can't reach Chowly right now. Check your connection and try again.",
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
