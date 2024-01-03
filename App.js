import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  Icon,
} from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import MainScreen from "./main/MainScreen";
import Header from "./component/header/Header";
import HeaderTitle from "./component/header/HeaderTitle";
import MenuBar from "./component/header/MenuBar";
import RightHeader from "./component/header/RightHeader";
import Products from "./main/shop/Products";
import Cart from "./main/shop/Cart";
import Login from "./main/user/Login";
import SingleProduct from "./main/shop/SingleProduct";
import Checkout from "./main/shop/Checkout";
import Thankyou from "./main/shop/Thankyou";
import AccountType from "./main/user/AccountType";
import SignUp from "./main/user/SignUp";
import Arimageviwer from "./component/mainscreen/ArimageViwer";

let persistor = persistStore(store);
const Drawer = createDrawerNavigator();
export default function App() {
  const theme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      myOwnColor: "#E1C9AA",
      linkColor: "#C1272D",
    },
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="Home"
              screenOptions={({ navigation }) => ({
                drawerStyle: {
                  // backgroundColor: "#c6cbef",
                  width: "100%",
                },
                headerStyle: {
                  backgroundColor: "#E1C9AA",
                  height: 90,
                },
                title: <HeaderTitle navigation={navigation} />,
                headerTintColor: "#000",
                headerTitleAlign: "left",
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                  textAlign: "left",
                },
                headerShown: true,
                headerLeft: () => {
                  return <MenuBar navigation={navigation} />;
                },
                headerRight: () => {
                  return <RightHeader navigation={navigation} />;
                },
              })}
              drawerContent={(props) => <Header {...props} />}
            >
              <Drawer.Screen name="Home" component={MainScreen} />
              <Drawer.Screen name="Products" component={Products} />
              <Drawer.Screen name="Cart" component={Cart} />
              <Drawer.Screen name="Checkout" component={Checkout} />
              <Drawer.Screen name="Product Page" component={SingleProduct} />
              <Drawer.Screen name="Thank You" component={Thankyou} />
              <Drawer.Screen name="Notification" component={Login} />
              <Drawer.Screen name="Login" component={Login} />
              <Drawer.Screen name="Select Account" component={AccountType} />
              <Drawer.Screen name="Signup" component={SignUp} />
              <Drawer.Screen name="ArView" component={Arimageviwer} />
            </Drawer.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1C9AA",
    alignItems: "center",
    justifyContent: "center",
  },
});
