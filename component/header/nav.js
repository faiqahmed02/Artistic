import { auth } from "../../firebaseConfig";

export const businessNav = [
  {
    icon: require("../../assets/box.png"),
    name: "Home",
  },
  {
    icon: require("../../assets/box.png"),
    name: "My Products",
  },
  {
    icon: require("../../assets/box.png"),
    name: "My Orders",
  },
  {
    icon: require("../../assets/box.png"),
    name: "Events",
  },
  {
    icon: require("../../assets/box.png"),
    name: "Create Event",
  },
  {
    icon: require("../../assets/box.png"),
    name: "Shipments",
  },
  {
    icon: require("../../assets/box.png"),
    name: "Classes",
  },
  {
    icon: require("../../assets/box.png"),
    name: "Create Classes",
  },
  {
    icon: require("../../assets/box.png"),
    name: "Order Selling",
  },
  {
    icon: require("../../assets/box.png"),
    name: "About Us",
  },
  {
    icon: require("../../assets/box.png"),
    name: "Technical Support",
  },
  {
    icon: require("../../assets/box.png"),
    name: "ZicoArt Policies & Requirements",
  },
  {
    icon: require("../../assets/box.png"),
    name: "ZicoArt Terms & Conditions",
  },
  {
    icon: require("../../assets/box.png"),
    name: auth.currentUser ? "Logout" : "Login",
  },
];


export const buyerNav = [
    {
      icon: require("../../assets/box.png"),
      name: "Home",
    },
    {
      icon: require("../../assets/box.png"),
      name: "My Orders",
    },
    {
      icon: require("../../assets/box.png"),
      name: "Subscriptions",
    },
    {
      icon: require("../../assets/box.png"),
      name: "Events",
    },
    {
      icon: require("../../assets/box.png"),
      name: "Classes",
    },
    {
      icon: require("../../assets/box.png"),
      name: "About Us",
    },
    {
      icon: require("../../assets/box.png"),
      name: "Technical Support",
    },
    {
      icon: require("../../assets/box.png"),
      name: "ZicoArt Policies & Requirements",
    },
    {
      icon: require("../../assets/box.png"),
      name: "ZicoArt Terms & Conditions",
    },
    {
      icon: require("../../assets/box.png"),
      name: auth.currentUser ? "Logout" : "Login",
    },
  ];