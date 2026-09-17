import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Uniwind, type ThemeName } from "uniwind";

const THEME_KEY = "chowly.theme";

/** "system" is not a theme Uniwind reports back, so it is stored separately. */
export type ThemePreference = ThemeName | "system";

const isPreference = (value: string | null): value is ThemePreference =>
  value === "light" || value === "dark" || value === "system";

/**
 * The chosen theme outlives the session: the app should reopen in the mode the
 * customer picked, not snap back to whatever the phone is set to.
 */
export const getStoredTheme = async (): Promise<ThemePreference> => {
  try {
    const stored =
      Platform.OS === "web"
        ? typeof localStorage !== "undefined"
          ? localStorage.getItem(THEME_KEY)
          : null
        : await SecureStore.getItemAsync(THEME_KEY);

    return isPreference(stored) ? stored : "system";
  } catch {
    return "system";
  }
};

export const applyTheme = async (preference: ThemePreference): Promise<void> => {
  Uniwind.setTheme(preference);

  try {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(THEME_KEY, preference);
      }

      return;
    }

    await SecureStore.setItemAsync(THEME_KEY, preference);
  } catch {
    // A device that refuses the keystore still gets the theme for this session.
  }
};
