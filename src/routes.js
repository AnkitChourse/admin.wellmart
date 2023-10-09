/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";

import ServiceProducts from "Pages/Products/Service Products";
import Orders from "Pages/Orders";
import Users from "Pages/Users";
import Category from "Pages/Category";
import Coupons from "Pages/Coupons";
import {
  Api,
  ColorLens,
  House,
  Layers,
  LocationCity,
  MenuBook,
  Paid,
  People,
  QueryStats,
  RoomPreferences,
  ShoppingCart,
  VideoLibrary,
  AddBusiness,
  ViewCarousel,
  Anchor,
} from "@mui/icons-material";
import Brands from "Pages/Brands";
import BlogPage from "Pages/Blogs";
import TutorialPage from "Pages/Tutorials";
import QueryPages from "Pages/Query";
import HomePage from "Pages/Home";
import Company from "Pages/Company";
import AttributeSection from "Pages/Attributes";
import TransactionSection from "Pages/Transections";
import Membership from "Pages/Membership";
import Tax from "Pages/Tax";
import HomeBanner from "Pages/HomeBanner";
import EHomeBanner from "Pages/EHomeBanner";
import AppBanner from "Pages/AppBanner";
import HomeCategoryCart from "Pages/HomeCategoryCart";
import EHomeCategoryCart from "Pages/EHomeCategoryCart";
import EHomeProduct from "Pages/EHomeProduct";
import HomeProduct from "Pages/HomeProduct";
import City from "Pages/City";
import PartnerProfile from "Pages/PartnerProfile";
import EcomAppBanner from "Pages/AppBanner/EcommAppBanner";
import SubAdmin from "Pages/SubAdmin";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Brands",
    key: "brands",
    icon: <Icon fontSize="small">Brands</Icon>,
    route: "/brands",
    component: <Brands />,
  },
  {
    type: "collapse",
    name: "Categories",
    key: "categories",
    icon: <Icon fontSize="small">Categories</Icon>,
    route: "/Categories",
    component: <Category />,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    icon: <ShoppingCart />,
    route: "/orders",
    component: <Orders />,
  },
  // {
  //   type: "collapse",
  //   name: "Home",
  //   key: "home",
  //   icon: <House />,
  //   route: "/home",
  //   component: <HomePage />,
  // },
  // {
  //   type: "collapse",
  //   name: "Service Home",
  //   key: "ServiceHome",
  //   icon: <House />,
  //   collapse: [
  //     {
  //       name: "Home Banner",
  //       key: "ServiceHome",
  //       collapseKey: "ServiceHome1",
  //       route: "/serviceHome/homeBanner",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <HomeBanner />,
  //       permissions: ["ALL", "HOME_BANNER"],
  //     },
  //     {
  //       name: "Home Category Cart",
  //       key: "ServiceHome",
  //       collapseKey: "ServiceHome2",
  //       route: "/serviceHome/homecategorycart",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <HomeCategoryCart />,
  //       permissions: ["ALL", "HOME_CATEGORY"],
  //     },
  //     {
  //       name: "Home Product",
  //       key: "ServiceHome",
  //       collapseKey: "ServiceHome3",
  //       route: "/serviceHome/homeproduct",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <HomeProduct />,
  //       permissions: ["ALL", "HOME_PRODUCT"],
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "E-commerce Home",
  //   key: "E-commerce Home",
  //   icon: <AddBusiness />,
  //   collapse: [
  //     {
  //       name: "E-Home Banner",
  //       key: "E-commerce Home",
  //       collapseKey: "EcommerceHome1",
  //       route: "/ecomHome/E-homeBanner",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <EHomeBanner />,
  //       permissions: ["ALL", "HOME_BANNER"],
  //     },
  //     {
  //       name: "E-Home Category Cart",
  //       key: "E-commerce Home",
  //       collapseKey: "EcommerceHome2",
  //       route: "/ecomHome/E-homecategorycart",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <EHomeCategoryCart />,
  //       permissions: ["ALL", "HOME_CATEGORY"],
  //     },
  //     {
  //       name: "E-Home Product",
  //       key: "E-commerce Home",
  //       collapseKey: "EcommerceHome3",
  //       route: "/ecomHome/E-homeproduct",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <EHomeProduct />,
  //       permissions: ["ALL", "HOME_PRODUCT"],
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "App Banner",
  //   key: "App Banner",
  //   icon: <ViewCarousel />,
  //   route: "/appBanner",
  //   component: <AppBanner />,
  //   permissions: ["ALL", "APP_BANNER"],
  // },
  // {
  //   type: "collapse",
  //   name: "App Banner",
  //   key: "App Banner",
  //   icon: <ViewCarousel />,
  //   collapse: [
  //     {
  //       name: "Service App Banner",
  //       key: "App Banner",
  //       collapseKey: "appBanner1",
  //       route: "/appBanner/service-appBanner",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <AppBanner />,
  //       permissions: ["ALL", "APP_BANNER"],
  //     },
  //     {
  //       name: "E-Com. App Banner",
  //       key: "App Banner",
  //       collapseKey: "appBanner2",
  //       route: "/appBanner/ecom-appBanner",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <EcomAppBanner />,
  //       permissions: ["ALL", "APP_BANNER"],
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "Category",
  //   key: "category",
  //   icon: <Icon fontSize="small">category</Icon>,
  //   collapse: [
  //     {
  //       name: "Service Category",
  //       key: "category",
  //       collapseKey: "category1",
  //       route: "/category/service-category",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <Category />,
  //       permissions: ["ALL", "CATERGORY"],
  //     },
  //     {
  //       name: "E-Commerce Category",
  //       key: "category",
  //       collapseKey: "category2",
  //       route: "/category/ecom-category",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <Category />,
  //       permissions: ["ALL", "CATERGORY"],
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "Company",
  //   key: "company",
  //   icon: <RoomPreferences />,
  //   route: "/products/service-products",
  //   component: <Company />,
  //   permissions: ["ALL", "PRODUCT"],
  // },




        {
          type: "collapse",
        name: "Products",
        key: "products",
        collapseKey: "product1",
        route: "/products/service-products",
        icon: <Icon fontSize="small"></Icon>,
        component: <ServiceProducts />,
        permissions: ["ALL", "PRODUCT"],
      },



   
  // {
  //   type: "collapse",
  //   name: "Products",
  //   key: "products",
  //   icon: <Icon fontSize="small"> storefront</Icon>,
  //   collapse: [
  //     {
  //       name: "Service Products",
  //       key: "products",
  //       collapseKey: "product1",
  //       route: "/products/service-products",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <ServiceProducts />,
  //       permissions: ["ALL", "PRODUCT"],
  //     },
  //     {
  //       name: "E-Commerce Products",
  //       key: "products",
  //       collapseKey: "product2",
  //       route: "/products/ecom-products",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <ServiceProducts />,
  //       permissions: ["ALL", "PRODUCT"],
  //     },
  //   ],
  // },
  {
    type: "collapse",
    name: "Utilities",
    key: "Utilities",
    icon: <Anchor />,
    collapse: [
      // {
      //   name: "City",
      //   key: "Utilities",
      //   collapseKey: 'Utilities1',
      //   route: "/utilities/city",
      //   icon: <Icon fontSize="small">radio_button_checked</Icon>,
      //   component: <City />,
      //   permissions: ["ALL", "CITY"],
      // },
      {
        name: "Tax",
        key: "Utilities",
        collapseKey: "Utilities2",
        route: "/utilities/tax",
        icon: <Icon fontSize="small">radio_button_checked</Icon>,
        component: <Tax />,
        permissions: ["ALL", "TAX"],
      },
      // {
      //   name: "E-commerce Brands",
      //   key: "Utilities",
      //   collapseKey: "Utilities3",
      //   route: "/utilities/brands",
      //   icon: <Icon fontSize="small">radio_button_checked</Icon>,
      //   component: <Brands />,
      //   permissions: ["ALL", "BRAND"],
      // },


      {
       
        name: "Coupons",
        key: "Utilities",
        collapseKey: "Utilities4",
        icon: <Icon fontSize="small">radio_button_checked</Icon>,
        route: "/coupons",
        component: <Coupons />,
        permissions: ["ALL", "COUPON"],
      },
     
    ],
  },

  // {
  //   type: "collapse",
  //   name: "E-commerce Brands",
  //   key: "brands",
  //   icon: <Api />,
  //   route: "/brands",
  //   component: <Brands />,
  // },

  // {
  //   type: "collapse",
  //   name: "Attribute",
  //   key: "attribute",
  //   icon: <ColorLens />,
  //   route: "/attribute",
  //   component: <AttributeSection />,
  // },

  // {
  //   type: "collapse",
  //   name: "Orders",
  //   key: "orders",
  //   icon: <ShoppingCart />,
  //   collapse: [
  //     {
  //       name: "Service Orders",
  //       key: "orders",
  //       collapseKey: "orders1",
  //       route: "/orders/service-orders",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <Orders />,
  //       permissions: ["ALL", "ORDER"],
  //     },
  //     {
  //       name: "E-commerce Orders",
  //       key: "orders",
  //       collapseKey: "orders2",
  //       route: "/orders/ecomm-orders",
  //       icon: <Icon fontSize="small">radio_button_checked</Icon>,
  //       component: <Orders />,
  //       permissions: ["ALL", "ORDER"],
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "City",
  //   key: "city",
  //   icon: <LocationCity />,
  //   route: "/city",
  //   component: <City />,
  // },
  // {
  //   type: "collapse",
  //   name: "Transaction",
  //   key: "transaction",
  //   icon: <Paid />,
  //   route: "/transaction",
  //   component: <TransactionSection />,
  // },
  // {
  //   type: "collapse",
  //   name: "Tax",
  //   key: "Tax",
  //   icon: <Paid />,
  //   route: "/tax",
  //   component: <Tax />,
  // },

  // {
  //   type: "collapse",
  //   name: "Blog",
  //   key: "blog",
  //   icon: <MenuBook />,
  //   route: "/blog",
  //   component: <BlogPage />,
  // },

  // {
  //   type: "collapse",
  //   name: "Tutorials",
  //   key: "tutorials",
  //   icon: <VideoLibrary />,
  //   route: "/tutorials",
  //   component: <TutorialPage />,
  // },
  // {
  //   type: "collapse",
  //   name: "Membership",
  //   key: "Membership",
  //   icon: <People />,
  //   route: "/membership",
  //   component: <Membership />,
  // },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <People />,
    collapse: [
      {
        name: "Customers",
        key: "users",
        collapseKey: "users1",
        route: "/users/customers",
        icon: <Icon fontSize="small">radio_button_checked</Icon>,
        component: <Users />,
        permissions: ["ALL", "USERS"],
      },
      // {
      //   name: "Partners",
      //   key: "users",
      //   collapseKey: "users2",
      //   route: "/users/partners",
      //   icon: <Icon fontSize="small">radio_button_checked</Icon>,
      //   component: <PartnerProfile />,
      //   permissions: ["ALL", "USERS"],
      // },
      // {
      //   name: "Admins",
      //   key: "users",
      //   collapseKey: "users3",
      //   route: "/users/admins",
      //   icon: <Icon fontSize="small">radio_button_checked</Icon>,
      //   component: <Users />,
      //   permissions: ["ALL", "USERS"],
      // },
      {
        name: "Sub Admins",
        key: "users",
        collapseKey: "users4",
        route: "/users/subadmins",
        icon: <Icon fontSize="small">radio_button_checked</Icon>,
        component: <SubAdmin />,
        permissions: ["ALL", "USERS"],
      },
    ],
  },

  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Query",
  //   key: "query",
  //   icon: <QueryStats />,
  //   route: "/query",
  //   component: <QueryPages />,
  // },
  {
    type: "collapse",
    name: "Company",
    key: "company",
    icon: <RoomPreferences />,
    route: "/company",
    component: <Company />,
    permissions: ["ALL", "COMMPANY"],
  },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    permissions: ["ALL"], 
  },
  {
    type: "route",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  // {
  //   type: "route",
  //   name: "Notifications",
  //   key: "Notifications",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/notifications/:id",
  //   component: <Notifications />,
  // },

  // {
  //   type: "route",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
