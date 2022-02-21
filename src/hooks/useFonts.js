import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    "p-300": require("../assets/fonts/p-300.otf"),
    "p-400": require("../assets/fonts/p-400.otf"),
    "p-500": require("../assets/fonts/p-500.otf"),
    "p-600": require("../assets/fonts/p-600.otf"),
    "p-700": require("../assets/fonts/p-700.otf")
  });
