import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
// import AuthStack from './src/navigations/AuthStack';
// import MainStack from './src/navigations/MainStack';
import {Provider, useSelector} from 'react-redux';
import { createStore } from "redux";
// import thunk from 'redux-thunk';
import reducers from "./src/redux/reducers";
import RootStack from './src/navigations/RootStack';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
import * as SplashScreen from 'expo-splash-screen';
import { loadAsync, useFonts } from "expo-font";
import Loader from "./src/components/Loader";

SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn); // it's good to explicitly catch and inspect any error

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const store = createStore(reducers);

  const handleDynamicLink = (link: {url: string}) => {
    // Handle dynamic link inside your own application
    // console.log(link!.url);
    // if (link.url === 'https://app.onemembr.com') {
    //   // ...navigate to your offers screen
    // }
  };

  const LoadFonts = async ()=>{
    await loadAsync({
      'p-300': require("./assets/fonts/p-300.otf"),
      'p-400': require("./assets/fonts/p-400.otf"),
      'p-500': require("./assets/fonts/p-500.otf"),
      'p-600': require("./assets/fonts/p-600.otf"),
      'p-700': require("./assets/fonts/p-700.otf"),
    });
    await SplashScreen.hideAsync();
    setLoading(false);
  }

  useEffect(() => {
    // const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    LoadFonts();
    // When the component is unmounted, remove the listener
    // return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then(link => {
  //       // console.log(link!.url);

  //       // if (link!.url === 'https://app.onemembr.com') {
  //       // }
  //     });
  // }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <Provider store={store}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
