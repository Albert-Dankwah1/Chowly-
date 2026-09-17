import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "chowly.accessToken";

/**
 * On native, the access token lives in the device keychain/keystore.
 * On web, it falls back to localStorage.
 * The API accepts it as `Authorization: Bearer <token>`.
 */
export const getAccessToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      return typeof localStorage !== "undefined" ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
    }

    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setAccessToken = async (token: string): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
      }

      return;
    }

    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  } catch {
    // Ignore storage failures
  }
};

export const clearAccessToken = async (): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }

      return;
    }

    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  } catch {
    // Ignore storage failures
  }
};
