/**
 * Wraps app.json so the map keys stay out of source control: Expo loads .env
 * into process.env before evaluating this file. Both keys are compiled into the
 * native project, so changing one needs a dev-client rebuild.
 */
const appJson = require("./app.json");

module.exports = () => ({
  ...appJson.expo,
  android: {
    ...appJson.expo.android,
    config: {
      ...appJson.expo.android?.config,
      googleMaps: { apiKey: process.env.ANDROID_MAPS_KEY ?? "" },
    },
  },
  ios: {
    ...appJson.expo.ios,
    config: {
      ...appJson.expo.ios?.config,
      googleMapsApiKey: process.env.IOS_MAPS_KEY ?? "",
    },
  },
});
