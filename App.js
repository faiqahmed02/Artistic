window.navigator.userAgent = "ReactNative";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
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
import Arimageviwer from "./component/mainscreen/Arimageviwer";
import EventsArchive from "./main/events/EventsArchive";
import EventsDetails from "./main/events/EventsDetails";
import About from "./main/other/About";
import ClassesArchive from "./main/classes/ClassesArchive";
import Polices from "./main/other/Polices";
import Terms from "./main/other/Terms";
import Support from "./main/other/Support";
import Profile from "./main/user/Profile";
import { StripeProvider } from "@stripe/stripe-react-native";
import CheckoutScreen from "./main/shop/CheckoutScreen";
import Subscription from "./main/subscription/Subscription";
import SubNow from "./main/subscription/SubNow";
import MyOrders from "./main/shop/orders/MyOrders";
import ChatScreen from "./main/user/ChatScreen";
import EventSubmissionForm from "./main/events/AddEvent";
import { useEffect } from "react";
import AddClasses from "./main/classes/AddClasses";
import EditProfile from "./main/user/EditProfile";
import ListAllArtist from "./main/user/chat/ListAllArtist";
// import AllChat from "./main/user/chat/AllChat";
import ChatListScreen from "./main/user/chat/AllChat";
import ChatRoom from "./main/user/chat/ChatRoom";
import AddProduct from "./main/shop/product/AddProduct";
import MyProducts from "./main/shop/product/MyProducts";
import ViewArtist from "./main/artist/ViewArtist";
import AllArtst from "./main/artist/AllArtst";
import ForgetPassward from "./main/user/ForgetPassward";
import Showroom from "./main/shop/product/Showroom";

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
    <StripeProvider
      publishableKey="pk_test_51IzlXYEHdax3d8oTDo9zwCBLNA7tqvVToG60ijHDZVTlkZf3j4cXGNZlOCrWrZeXwxRyWy8ovfFvLBk4dZHvM4lK00mg1kJn6V"
      merchantIdentifier="merchant.com.faiqahmed.zicoart"
      urlScheme=""
    >
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
                <Drawer.Screen name="About Us" component={About} />
                <Drawer.Screen
                  name="Privacy policies"
                  component={Polices}
                />
                <Drawer.Screen
                  name="Terms & Conditions"
                  component={Terms}
                />
                <Drawer.Screen name="Technical Support" component={Support} />
                <Drawer.Screen name="Products" component={Products} />
                <Drawer.Screen name="My Products" component={MyProducts} />
                <Drawer.Screen name="Add Product" component={AddProduct} />
                <Drawer.Screen name="Showrooms" component={Showroom} />
                <Drawer.Screen name="Cart" component={Cart} />
                <Drawer.Screen name="Checkout" component={Checkout} />
                <Drawer.Screen name="My Orders" component={MyOrders} />
                <Drawer.Screen name="Order Selling" component={MyOrders} />
                <Drawer.Screen name="Product Page" component={SingleProduct} />
                <Drawer.Screen name="Thank You" component={Thankyou} />
                <Drawer.Screen name="Notification" component={Login} />
                <Drawer.Screen name="Login" component={Login} />
                
                <Drawer.Screen
                  name="Forget Password"
                  component={ForgetPassward}
                />
                <Drawer.Screen name="Select Account" component={AccountType} />
                <Drawer.Screen name="Signup" component={SignUp} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Edit Profile" component={EditProfile} />
                <Drawer.Screen name="Chat" component={ChatListScreen} />
                <Drawer.Screen name="Chat Screen" component={ChatScreen} />
                <Drawer.Screen name="Chat Room" component={ChatRoom} />
                <Drawer.Screen name="New Chat" component={ListAllArtist} />
                <Drawer.Screen name="ArView" component={Arimageviwer} />
                <Drawer.Screen
                  name="Checkout Screen"
                  component={CheckoutScreen}
                />
                {/* Events */}
                <Drawer.Screen name="Events" component={EventsArchive} />
                <Drawer.Screen
                  name="Events Details"
                  component={EventsDetails}
                />
                <Drawer.Screen
                  name="Create Event"
                  component={EventSubmissionForm}
                />
                {/* Classes */}
                <Drawer.Screen name="Classes" component={ClassesArchive} />
                <Drawer.Screen name="Create Classes" component={AddClasses} />
                {/* Subsciptios */}
                <Drawer.Screen name="Subscriptions" component={Subscription} />
                <Drawer.Screen name="Pay Now" component={SubNow} />

                {/* Shippments */}

                <Drawer.Screen name="Shipments" component={SubNow} />

                {/* Artist */}
                <Drawer.Screen name="All Artist" component={AllArtst} />
                <Drawer.Screen name="View Artist" component={ViewArtist} />
              </Drawer.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
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
