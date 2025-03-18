// src/hooks/useLoadFonts.js
import { useFonts } from 'expo-font';

export default function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    Alata: require('../assets/fonts/Alata-Regular.ttf'),
    Roboto: require('../assets/fonts/Roboto-Medium.ttf'),
    abeeze: require('../assets/fonts/abeze.ttf'),
    myanmar: require('../assets/fonts/myanmar.ttf'),
    montserat: require('../assets/fonts/montserat.ttf'),
    montserat_medium : require("../assets/fonts/Montserrat-Medium.ttf"),
  });

  return fontsLoaded;
}
